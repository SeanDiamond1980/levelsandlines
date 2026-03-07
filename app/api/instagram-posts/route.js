import { NextResponse } from "next/server"
import { createClient } from "@vercel/kv"

// Check if KV is available
const isKVAvailable = () => {
  return process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
}

// Create KV client lazily
let kvClient = null
const getKVClient = () => {
  if (!kvClient && isKVAvailable()) {
    kvClient = createClient({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    })
  }
  return kvClient
}

// Demo posts for fallback
const demoPosts = [
  {
    id: "demo_video_1",
    type: "video",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9095-IVBM3G3KTFgcBT2psgztYQlpLcNdJn.mov",
    caption: "coming soon toronto;",
    likes: 1,
    comments: 1,
    permalink: "https://instagram.com/levels.and.lines",
    isDemo: true,
  },
]

// In-memory storage fallback
let memoryPosts = [...demoPosts]

// KV storage functions
async function getPostsFromKV() {
  try {
    const client = getKVClient()
    if (!client) {
      console.log("⚠️ KV client not available, using demo posts")
      return demoPosts
    }
    const posts = await client.get("instagram_posts")
    return posts || demoPosts
  } catch (error) {
    console.error("❌ Error retrieving posts from KV:", error.message)
    // Return demo posts on any error - don't let KV issues break the site
    return demoPosts
  }
}

async function savePostsToKV(posts) {
  try {
    const client = getKVClient()
    if (!client) {
      console.log("⚠️ KV client not available, cannot save")
      return false
    }
    await client.set("instagram_posts", posts)
    console.log("✅ Posts saved to KV successfully")
    return true
  } catch (error) {
    console.error("❌ Error saving posts to KV:", error.message)
    return false
  }
}

// Unified storage functions
async function getPosts() {
  if (isKVAvailable()) {
    console.log("📦 Using KV storage")
    return await getPostsFromKV()
  } else {
    console.log("🧠 Using memory storage (KV not available)")
    return memoryPosts
  }
}

async function savePosts(posts) {
  if (isKVAvailable()) {
    console.log("📦 Saving to KV storage")
    return await savePostsToKV(posts)
  } else {
    console.log("🧠 Saving to memory storage")
    memoryPosts = posts
    return true
  }
}

export async function GET() {
  try {
    console.log("🔄 Fetching Instagram posts...")

    const posts = await getPosts()

    // Prioritize real posts over demo posts
    const realPosts = posts.filter((post) => !post.isDemo)
    const demoPosts = posts.filter((post) => post.isDemo)
    const prioritizedPosts = [...realPosts, ...demoPosts]

    console.log(`✅ Retrieved ${posts.length} total posts (${realPosts.length} real, ${demoPosts.length} demo)`)
    console.log(`📊 Storage type: ${isKVAvailable() ? "persistent_kv" : "memory"}`)

    return NextResponse.json({
      success: true,
      data: prioritizedPosts,
      storageType: isKVAvailable() ? "persistent_kv" : "memory",
      totalPosts: posts.length,
      realPosts: realPosts.length,
      demoPosts: demoPosts.length,
    })
  } catch (error) {
    console.error("❌ Error in GET /api/instagram-posts:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        data: demoPosts,
        storageType: isKVAvailable() ? "persistent_kv" : "memory",
      },
      { status: 500 },
    )
  }
}

export async function POST(request) {
  try {
    const newPost = await request.json()
    console.log("📝 Adding new Instagram post:", newPost.id)

    const currentPosts = await getPosts()

    // Remove any existing post with the same ID
    const filteredPosts = currentPosts.filter((post) => post.id !== newPost.id)

    // Add the new post at the beginning
    const updatedPosts = [newPost, ...filteredPosts]

    // Keep only the last 10 posts to prevent unlimited growth
    const trimmedPosts = updatedPosts.slice(0, 10)

    const saved = await savePosts(trimmedPosts)

    if (saved) {
      console.log(`✅ Post added successfully. Total posts: ${trimmedPosts.length}`)
      return NextResponse.json({
        success: true,
        message: "Post added successfully",
        data: trimmedPosts,
        storageType: isKVAvailable() ? "persistent_kv" : "memory",
      })
    } else {
      throw new Error("Failed to save posts")
    }
  } catch (error) {
    console.error("❌ Error in POST /api/instagram-posts:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        storageType: isKVAvailable() ? "persistent_kv" : "memory",
      },
      { status: 500 },
    )
  }
}
