"use client"
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react"
import type React from "react"
import Image from "next/image"

import { useState } from "react"

interface InstagramPostProps {
  post: {
    id: string
    type: "image" | "video"
    src: string
    caption: string
    likes: number
    comments: number
    permalink: string
  }
  isActive?: boolean
  isExpanded?: boolean
  isPlaying?: boolean
  videoRef?: React.RefObject<HTMLVideoElement>
  onVideoEnded?: () => void
  onVideoClick?: () => void
  isMobile?: boolean
}

export default function InstagramPost({
  post,
  isActive = false,
  isExpanded = false,
  isPlaying = false,
  videoRef,
  onVideoEnded,
  onVideoClick,
  isMobile = false,
}: InstagramPostProps) {
  const [liked, setLiked] = useState(false)
  const [localLikes, setLocalLikes] = useState(post.likes)

  const handleLike = () => {
    setLiked(!liked)
    setLocalLikes(liked ? localLikes - 1 : localLikes + 1)
  }

  const handleVideoClick = () => {
    if (onVideoClick) {
      onVideoClick()
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-80 h-96 sm:w-96 sm:h-[500px] flex flex-col">
      {/* Instagram Header - Fixed height */}
      <div className="flex items-center justify-between p-3 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-full p-0.5">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
              <Image
                src="/images/levels-lines-sigil-black-new.png"
                alt="Levels & Lines"
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-900">levels.and.lines</p>
            <p className="text-xs text-gray-500">Toronto, Ontario</p>
          </div>
        </div>
        <MoreHorizontal className="w-5 h-5 text-gray-600" />
      </div>

      {/* Media Content - Controlled height to leave space for footer */}
      <div className="relative bg-black flex items-center justify-center h-64 sm:h-80 flex-shrink-0">
        {post.type === "video" ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover cursor-pointer"
            autoPlay
            muted
            loop
            playsInline
            onEnded={onVideoEnded}
            onClick={handleVideoClick}
          >
            <source src={post.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={post.src || "/placeholder.svg"}
            alt="Instagram post"
            className="w-full h-full object-cover cursor-pointer"
            onClick={handleVideoClick}
          />
        )}
      </div>

      {/* Instagram Footer - Fixed height with scrollable content if needed */}
      <div className="p-3 space-y-2 flex-shrink-0 min-h-0 flex-1">
        {/* Action buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={handleLike} className="hover:opacity-70 transition-opacity">
              <Heart className={`w-6 h-6 ${liked ? "fill-red-500 text-red-500" : "text-gray-900"}`} />
            </button>
            <button className="hover:opacity-70 transition-opacity">
              <MessageCircle className="w-6 h-6 text-gray-900" />
            </button>
            <button className="hover:opacity-70 transition-opacity">
              <Send className="w-6 h-6 text-gray-900" />
            </button>
          </div>
          <button className="hover:opacity-70 transition-opacity">
            <Bookmark className="w-6 h-6 text-gray-900" />
          </button>
        </div>

        {/* Likes */}
        <p className="font-semibold text-sm text-gray-900">{localLikes.toLocaleString()} likes</p>

        {/* Caption - Truncated to fit */}
        <div className="text-sm text-gray-900">
          <span className="font-semibold">levels.and.lines</span>{" "}
          <span className="text-gray-700">
            {post.caption.length > 60 ? `${post.caption.substring(0, 60)}...` : post.caption}
          </span>
        </div>

        {/* Comments - Always visible */}
        <p className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">View all {post.comments} comments</p>

        {/* Add time posted */}
        <p className="text-xs text-gray-400 uppercase tracking-wide">2 hours ago</p>
      </div>
    </div>
  )
}
