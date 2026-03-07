"use client"
import { Button } from "@/components/ui/button"
import { Phone, MapPin, ArrowRight, Clock, CheckCircle, X, Plus, Home, Store, Building, Building2 } from "lucide-react"
import Image from "next/image"
import { useState, useEffect, useRef, useCallback } from "react"
import InstagramPost from "@/components/InstagramPost"

// Replace the LLLogo component with:
function LLLogo({
  className = "h-8 w-8",
  useWhiteLogo = false,
}: {
  className?: string
  useWhiteLogo?: boolean
}) {
  if (useWhiteLogo) {
    // Use white logo for dark sections
    return (
      <Image
        src="/images/levels-lines-white-logo.png"
        alt="Levels & Lines Architecture Visualization"
        width={200}
        height={80}
        className={className}
      />
    )
  }

  // Use black logo for light sections
  return (
    <Image
      src="/images/levels-lines-black-logo.png"
      alt="Levels & Lines Architecture Visualization"
      width={200}
      height={80}
      className={className}
    />
  )
}

function HowItWorksCarousel() {
  const [currentStep, setCurrentStep] = useState(0)
  const totalSteps = 5 // Define total steps as a constant

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % totalSteps)
  }

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + totalSteps) % totalSteps)
  }

  const goToStep = (index: number) => {
    setCurrentStep(index)
  }

  const steps = [
    {
      number: 1,
      title: "Upload Your Drawings",
      mobileContent: (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mx-auto relative pb-16 min-h-[300px]">
          <div className="p-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900">Upload Your Drawings</h3>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-slate-600 leading-relaxed">
                Share your high-resolution architectural drawings and floor plans with our team.
              </p>
              <p className="text-xs text-slate-500">We accept all major file formats.</p>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-900">Supported Formats</h4>
              <div className="flex flex-wrap gap-2">
                <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-medium text-slate-700">PDF</span>
                <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-medium text-slate-700">DWG</span>
                <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-medium text-slate-700">JPG</span>
                <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-medium text-slate-700">PNG</span>
                <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-medium text-slate-700">BIM</span>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Footer */}
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3">
            <div className="flex items-center justify-between">
              <button
                onClick={prevStep}
                className="flex items-center space-x-1 px-3 py-1 text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-slate-50 text-sm"
                disabled={currentStep === 0}
              >
                <ArrowRight className="w-3 h-3 rotate-180" />
                <span className="text-xs font-medium">Previous</span>
              </button>

              <div className="bg-slate-100 rounded-full px-3 py-1">
                <span className="text-xs text-slate-700 font-medium">
                  {currentStep + 1} of {totalSteps}
                </span>
              </div>

              <button
                onClick={nextStep}
                className="flex items-center space-x-1 px-3 py-1 text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-slate-50 text-sm"
                disabled={currentStep === totalSteps - 1}
              >
                <span className="text-xs font-medium">Next</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      ),
      desktopContent: (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-7xl mx-auto relative pb-20 min-h-[500px]">
          <div className="flex min-h-[500px]">
            {/* Left side - Content */}
            <div className="w-3/5 p-8 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900">Upload Your Drawings</h3>
                </div>

                <div className="space-y-4">
                  <p className="text-xl text-slate-600 leading-relaxed">
                    Share your high-resolution architectural drawings and floor plans with our team.
                  </p>
                  <p className="text-slate-500">We accept all major file formats.</p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-slate-900">Supported Formats</h4>
                  <div className="flex flex-wrap gap-3">
                    <span className="bg-slate-100 px-4 py-2 rounded-full text-sm font-medium text-slate-700">PDF</span>
                    <span className="bg-slate-100 px-4 py-2 rounded-full text-sm font-medium text-slate-700">DWG</span>
                    <span className="bg-slate-100 px-4 py-2 rounded-full text-sm font-medium text-slate-700">JPG</span>
                    <span className="bg-slate-100 px-4 py-2 rounded-full text-sm font-medium text-slate-700">PNG</span>
                    <span className="bg-slate-100 px-4 py-2 rounded-full text-sm font-medium text-slate-700">BIM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Upload Interface */}
            <div className="w-2/5 relative flex items-center justify-center p-6">
              <div className="w-full max-w-md space-y-4">
                {/* Upload Area - Made smaller */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="space-y-3">
                    <div className="mx-auto w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Drop files here or click to browse</p>
                      <p className="text-xs text-gray-500 mt-1">PDF, DWG, BIM, JPG, PNG up to 50MB</p>
                    </div>
                  </div>
                </div>

                {/* Uploaded Files */}
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 bg-gray-50 text-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-gray-900">Main_Floor.dwg</p>
                    </div>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 bg-gray-50 text-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-gray-900">Second_Floor.dwg</p>
                    </div>
                  </div>

                  {/* Ready for Processing - Made smaller */}
                  <div className="border-2 border-dashed border-green-300 rounded-lg p-2 bg-green-50 text-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-1">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-green-800">Upload Successful</p>
                  </div>
                </div>

                {/* Submit Button */}
                <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <span>Submit</span>
                </button>

                {/* Status Message */}
                <div className="text-center">
                  <p className="text-xs text-gray-500">Your files are encrypted and secure</p>
                </div>
              </div>
            </div>
          </div>
          {/* Card Navigation Footer */}
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={prevStep}
                className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-slate-50"
                disabled={currentStep === 0}
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                <span className="text-sm font-medium">Previous</span>
              </button>

              <div className="bg-slate-100 rounded-full px-4 py-2">
                <span className="text-sm text-slate-700 font-medium">
                  {currentStep + 1} of {totalSteps}
                </span>
              </div>

              <button
                onClick={nextStep}
                className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-slate-50"
                disabled={currentStep === totalSteps - 1}
              >
                <span className="text-sm font-medium">Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      number: 2,
      title: "Provide Any Supporting Images",
      mobileContent: (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mx-auto relative pb-16 min-h-[300px]">
          <div className="p-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900">Supporting Images</h3>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-slate-600 leading-relaxed">
                Upload 3D renderings, conceptual drawings, or supporting images that can be projected on the walls
                alongside the drawings.
              </p>
            </div>
          </div>

          {/* Mobile Navigation Footer */}
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3">
            <div className="flex items-center justify-between">
              <button
                onClick={prevStep}
                className="flex items-center space-x-1 px-3 py-1 text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-slate-50 text-sm"
                disabled={currentStep === 0}
              >
                <ArrowRight className="w-3 h-3 rotate-180" />
                <span className="text-xs font-medium">Previous</span>
              </button>

              <div className="bg-slate-100 rounded-full px-3 py-1">
                <span className="text-xs text-slate-700 font-medium">
                  {currentStep + 1} of {totalSteps}
                </span>
              </div>

              <button
                onClick={nextStep}
                className="flex items-center space-x-1 px-3 py-1 text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-slate-50 text-sm"
                disabled={currentStep === totalSteps - 1}
              >
                <span className="text-xs font-medium">Next</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      ),
      desktopContent: (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-7xl mx-auto relative pb-20 min-h-[500px]">
          <div className="flex min-h-[500px]">
            {/* Left side - Content */}
            <div className="w-3/5 p-8 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900">Provide Any Supporting Images</h3>
                </div>

                <div className="space-y-4">
                  <p className="text-xl text-slate-600 leading-relaxed">
                    Upload 3D renderings, conceptual drawings, or supporting images that can be projected on the walls
                    alongside the drawings.
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Upload Interface */}
            <div className="w-2/5 relative flex items-center justify-center p-6">
              <div className="w-full max-w-md space-y-4">
                {/* Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="space-y-3">
                    <div className="mx-auto w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Drop 3D renderings here</p>
                      <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG</p>
                    </div>
                  </div>
                </div>

                {/* Uploaded Files */}
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 bg-gray-50 text-center">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-gray-900">Living_Room.pdf</p>
                    </div>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 bg-gray-50 text-center">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-gray-900">Kitchen.pdf</p>
                    </div>
                  </div>

                  {/* Ready for Processing - Made smaller */}
                  <div className="border-2 border-dashed border-green-300 rounded-lg p-1 bg-green-50 text-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-1">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-green-800">Upload Successful</p>
                  </div>
                </div>

                {/* Submit Button */}
                <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Submit</span>
                </button>

                {/* Status Message */}
                <div className="text-center">
                  <p className="text-xs text-gray-500">Supporting images enhance the walkthrough</p>
                </div>
              </div>
            </div>
          </div>
          {/* Card Navigation Footer */}
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={prevStep}
                className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-slate-50"
                disabled={currentStep === 0}
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                <span className="text-sm font-medium">Previous</span>
              </button>

              <div className="bg-slate-100 rounded-full px-4 py-2">
                <span className="text-sm text-slate-700 font-medium">
                  {currentStep + 1} of {totalSteps}
                </span>
              </div>

              <button
                onClick={nextStep}
                className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-slate-50"
                disabled={currentStep === totalSteps - 1}
              >
                <span className="text-sm font-medium">Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      number: 3,
      title: "Customize The Experience",
      mobileContent: (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mx-auto relative pb-16 min-h-[300px]">
          <div className="p-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900">Customize Experience</h3>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-slate-600 leading-relaxed">
                Tailor the walkthrough to your presentation needs. Choose to display dimensions, focus on specific
                rooms, or create a comprehensive tour.
              </p>
              <div className="space-y-2 text-xs">
                <div className="text-slate-700">• Show/hide dimensions and measurements</div>
                <div className="text-slate-700">• Select the walkthrough order</div>
                <div className="text-slate-700">• Identify what furniture to add to each room</div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Footer */}
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3">
            <div className="flex items-center justify-between">
              <button
                onClick={prevStep}
                className="flex items-center space-x-1 px-3 py-1 text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-slate-50 text-sm"
                disabled={currentStep === 0}
              >
                <ArrowRight className="w-3 h-3 rotate-180" />
                <span className="text-xs font-medium">Previous</span>
              </button>

              <div className="bg-slate-100 rounded-full px-3 py-1">
                <span className="text-xs text-slate-700 font-medium">
                  {currentStep + 1} of {totalSteps}
                </span>
              </div>

              <button
                onClick={nextStep}
                className="flex items-center space-x-1 px-3 py-1 text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-slate-50 text-sm"
                disabled={currentStep === totalSteps - 1}
              >
                <span className="text-xs font-medium">Next</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      ),
      desktopContent: (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-7xl mx-auto relative pb-20 min-h-[500px]">
          <div className="flex min-h-[500px]">
            {/* Left side - Content */}
            <div className="w-3/5 p-8 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900">Customize The Experience</h3>
                </div>

                <div className="space-y-4">
                  <p className="text-xl text-slate-600 leading-relaxed">
                    Tailor the walkthrough to your presentation needs. Choose to display dimensions, focus on specific
                    rooms, or create a comprehensive tour.
                  </p>
                  <div className="space-y-3">
                    <div className="text-slate-700">• Show/hide dimensions and measurements</div>
                    <div className="text-slate-700">• Select the walkthrough order</div>
                    <div className="text-slate-700">• Identify what furniture to add to each room</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Walkthrough Customization Interface */}
            <div className="w-2/5 relative flex items-center justify-center p-6 bg-gray-50">
              <div className="w-full max-w-xs space-y-1 bg-white rounded-lg shadow-sm p-2">
                {/* Header */}
                <div className="text-center border-b pb-1">
                  <h3 className="text-sm font-bold text-gray-900">Customize Your Walkthrough</h3>
                </div>

                {/* Show Measurements Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Show measurements</span>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors">
                    <div className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform translate-x-6" />
                  </div>
                </div>

                {/* Main Floor Section */}
                <div className="space-y-1">
                  <div className="bg-gray-50 rounded-lg p-2 border">
                    <h4 className="text-xs font-semibold text-gray-900 mb-1">Main Floor</h4>

                    {/* Room 1 - Foyer */}
                    <div className="space-y-1 mb-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-800">1. Foyer</span>
                        <div className="text-gray-400 text-sm">≡</div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <span className="inline-flex items-center bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                          Walls
                          <X className="w-3 h-3 ml-1 cursor-pointer" />
                        </span>
                        <button className="inline-flex items-center bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full hover:bg-gray-300">
                          <Plus className="w-3 h-3 mr-1" />
                          New Element
                        </button>
                      </div>
                    </div>

                    {/* Room 2 - Living Room */}
                    <div className="space-y-1 mb-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-800">2. Living Room</span>
                        <div className="text-gray-400 text-sm">≡</div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <span className="inline-flex items-center bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          Sofa
                          <X className="w-3 h-3 ml-1 cursor-pointer" />
                        </span>
                        <span className="inline-flex items-center bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          Coffee Table
                          <X className="w-3 h-3 ml-1 cursor-pointer" />
                        </span>
                        <button className="inline-flex items-center bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full hover:bg-gray-300">
                          <Plus className="w-3 h-3 mr-1" />
                          New Element
                        </button>
                      </div>
                    </div>

                    {/* Room 3 - Kitchen */}
                    <div className="space-y-1 mb-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-800">3. Kitchen</span>
                        <div className="text-gray-400 text-sm">≡</div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <span className="inline-flex items-center bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                          Kitchen Island
                          <X className="w-3 h-3 ml-1 cursor-pointer" />
                        </span>
                        <button className="inline-flex items-center bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full hover:bg-gray-300">
                          <Plus className="w-3 h-3 mr-1" />
                          New Element
                        </button>
                      </div>
                    </div>

                    {/* Add New Room Button */}
                    <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-1 text-xs text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors">
                      + New Room
                    </button>
                  </div>

                  {/* Add New Floor Button */}
                  <button className="w-full border border-gray-300 rounded-lg p-1 text-xs text-gray-700 hover:bg-gray-50 transition-colors">
                    + New Floor
                  </button>

                  {/* Submit Button */}
                  <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-1 px-2 rounded-lg transition-colors text-xs">
                    Submit Walkthrough Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Card Navigation Footer */}
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={prevStep}
                className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-slate-50"
                disabled={currentStep === 0}
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                <span className="text-sm font-medium">Previous</span>
              </button>

              <div className="bg-slate-100 rounded-full px-4 py-2">
                <span className="text-sm text-slate-700 font-medium">
                  {currentStep + 1} of {totalSteps}
                </span>
              </div>

              <button
                onClick={nextStep}
                className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-slate-50"
                disabled={currentStep === totalSteps - 1}
              >
                <span className="text-sm font-medium">Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      number: 4,
      title: "Schedule Your Visit",
      mobileContent: (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mx-auto relative pb-16 min-h-[300px]">
          <div className="p-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                4
              </div>
              <h3 className="text-lg font-bold text-slate-900">Schedule Your Visit</h3>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-slate-600 leading-relaxed">
                Book your full-scale walkthrough experience at one of our downtown Toronto Studios. Request to book 2-4
                weeks in advance.
              </p>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-slate-900">Studio Options</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3 h-3 text-slate-600" />
                    <span className="text-slate-700">Downtown East @ Illuminarium</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3 h-3 text-slate-600" />
                    <span className="text-slate-700">Downtown West @ Arcadia Earth</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Footer */}
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3">
            <div className="flex items-center justify-between">
              <button
                onClick={prevStep}
                className="flex items-center space-x-1 px-3 py-1 text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-slate-50 text-sm"
                disabled={currentStep === 0}
              >
                <ArrowRight className="w-3 h-3 rotate-180" />
                <span className="text-xs font-medium">Previous</span>
              </button>

              <div className="bg-slate-100 rounded-full px-3 py-1">
                <span className="text-xs text-slate-700 font-medium">
                  {currentStep + 1} of {totalSteps}
                </span>
              </div>

              <button
                onClick={nextStep}
                className="flex items-center space-x-1 px-3 py-1 text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-slate-50 text-sm"
                disabled={currentStep === totalSteps - 1}
              >
                <span className="text-xs font-medium">Next</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      ),
      desktopContent: (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-7xl mx-auto relative pb-20 min-h-[500px]">
          <div className="flex min-h-[500px]">
            {/* Left side - Content */}
            <div className="w-3/5 p-8 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900">Schedule Your Visit</h3>
                </div>

                <div className="space-y-4">
                  <p className="text-xl text-slate-600 leading-relaxed">
                    Book your full-scale walkthrough experience at one of our downtown Toronto Studios. Request to book
                    2-4 weeks in advance and choose your location and time to accommodate your project needs.
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-3">Studio Options</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-slate-600" />
                        <span className="text-slate-700">Downtown Toronto East @ Illuminarium</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-slate-600" />
                        <span className="text-slate-700">Downtown Toronto West @ Arcadia Earth</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Booking Interface */}
            <div className="w-2/5 relative flex items-center justify-center p-6 bg-gray-50">
              <div className="w-full max-w-[200px] bg-white rounded-lg shadow-sm p-2 space-y-2">
                {/* Header */}
                <div className="text-center">
                  <h3 className="text-sm font-bold text-gray-900">Book Walkthrough</h3>
                  <p className="text-xs text-gray-600">Select options</p>
                </div>

                {/* Location Selection */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700">Location</label>
                  <div className="space-y-0.5">
                    <div className="border-2 border-blue-500 bg-blue-50 rounded p-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-medium text-gray-900">Downtown West</p>
                        </div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                    </div>

                    <div className="border border-gray-300 rounded p-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-medium text-gray-900">Downtown East</p>
                        </div>
                        <div className="w-2 h-2 border border-gray-300 rounded-full"></div>
                      </div>
                    </div>

                    <div className="border border-gray-200 bg-gray-50 rounded p-1 opacity-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-medium text-gray-500">Midtown</p>
                        </div>
                        <div className="w-2 h-2 border border-gray-200 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Date Selection - Calendar */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700">Date</label>
                  <div className="grid grid-cols-7 gap-0.5 text-xs">
                    {/* Calendar header */}
                    <div className="text-center text-gray-500 font-medium">S</div>
                    <div className="text-center text-gray-500 font-medium">M</div>
                    <div className="text-center text-gray-500 font-medium">T</div>
                    <div className="text-center text-gray-500 font-medium">W</div>
                    <div className="text-center text-gray-500 font-medium">T</div>
                    <div className="text-center text-gray-500 font-medium">F</div>
                    <div className="text-center text-gray-500 font-medium">S</div>

                    {/* Calendar dates - ensure all buttons are properly closed */}
                    <button className="p-0.5 text-xs text-gray-400 rounded">1</button>
                    <button className="p-0.5 text-xs text-gray-400 rounded">2</button>
                    <button className="p-0.5 text-xs text-gray-400 rounded">3</button>
                    <button className="p-0.5 text-xs text-gray-400 rounded">4</button>
                    <button className="p-0.5 text-xs text-gray-400 rounded">5</button>
                    <button className="p-0.5 text-xs text-gray-400 rounded">6</button>
                    <button className="p-0.5 text-xs text-gray-400 rounded">7</button>

                    <button className="p-0.5 text-xs text-gray-400 rounded">8</button>
                    <button className="p-0.5 text-xs text-gray-400 rounded">9</button>
                    <button className="p-0.5 text-xs text-gray-400 rounded">10</button>
                    <button className="p-0.5 text-xs text-gray-400 rounded">11</button>
                    <button className="p-0.5 text-xs text-gray-400 rounded">12</button>
                    <button className="p-0.5 text-xs text-gray-400 rounded">13</button>
                    <button className="p-0.5 text-xs text-gray-400 rounded">14</button>

                    <button className="p-0.5 text-xs border-2 border-blue-500 bg-blue-50 text-blue-700 rounded font-medium">
                      15
                    </button>
                    <button className="p-0.5 text-xs border border-gray-300 rounded hover:bg-gray-50">16</button>
                    <button className="p-0.5 text-xs border border-gray-300 rounded hover:bg-gray-50">17</button>
                    <button className="p-0.5 text-xs border-2 border-blue-500 bg-blue-50 text-blue-700 rounded font-medium">
                      18
                    </button>
                    <button className="p-0.5 text-xs border border-gray-300 rounded hover:bg-gray-50">19</button>
                    <button className="p-0.5 text-xs border border-gray-300 rounded hover:bg-gray-50">20</button>
                    <button className="p-0.5 text-xs border border-gray-300 rounded hover:bg-gray-50">21</button>

                    <button className="p-0.5 text-xs border border-gray-300 rounded hover:bg-gray-50">22</button>
                    <button className="p-0.5 text-xs border border-gray-300 rounded hover:bg-gray-50">23</button>
                    <button className="p-0.5 text-xs border border-gray-300 rounded hover:bg-gray-50">24</button>
                    <button className="p-0.5 text-xs text-gray-400 rounded">25</button>
                    <button className="p-0.5 text-xs text-gray-400 rounded">26</button>
                    <button className="p-0.5 text-xs text-gray-400 rounded">27</button>
                    <button className="p-0.5 text-xs text-gray-400 rounded">28</button>
                  </div>
                </div>

                {/* Time Selection */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700">Time</label>
                  <div className="grid grid-cols-2 gap-0.5">
                    <button className="p-0.5 text-xs border border-gray-300 rounded">9AM</button>
                    <button className="p-0.5 text-xs border-2 border-blue-500 bg-blue-50 text-blue-700 rounded font-medium">
                      10AM
                    </button>
                    <button className="p-0.5 text-xs border border-gray-300 rounded">1PM</button>
                    <button className="p-0.5 text-xs border-2 border-blue-500 bg-blue-50 text-blue-700 rounded font-medium">
                      2PM
                    </button>
                  </div>
                </div>

                {/* Request Booking Button */}
                <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-1 px-1 rounded text-xs">
                  Request Booking
                </button>

                {/* Note */}
                <div className="text-center">
                  <p className="text-xs text-gray-500">2-4 weeks ahead</p>
                </div>
              </div>
            </div>
          </div>
          {/* Card Navigation Footer */}
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={prevStep}
                className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-slate-50"
                disabled={currentStep === 0}
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                <span className="text-sm font-medium">Previous</span>
              </button>

              <div className="bg-slate-100 rounded-full px-4 py-2">
                <span className="text-sm text-slate-700 font-medium">
                  {currentStep + 1} of {totalSteps}
                </span>
              </div>

              <button
                onClick={nextStep}
                className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-slate-50"
                disabled={currentStep === totalSteps - 1}
              >
                <span className="text-sm font-medium">Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      number: 5,
      title: "Experience Your Design",
      mobileContent: (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mx-auto relative pb-16 min-h-[300px]">
          <div className="p-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                5
              </div>
              <h3 className="text-lg font-bold text-slate-900">Experience Your Design</h3>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-slate-600 leading-relaxed">
                Step inside your future space and experience it in true dimensions.
              </p>
              <p className="text-xs text-slate-500">
                Lay down furniture, put up walls and walk through room layouts to validate your space decisions.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-900">What You'll Experience</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span className="text-slate-700">Test room layouts and proportions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-3 h-3 text-blue-600" />
                  <span className="text-slate-700">Feel spatial relationships</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-3 h-3 text-purple-600" />
                  <span className="text-slate-700">Make confident decisions</span>
                </div>
              </div>
            </div>

            <div className="inline-flex items-center space-x-2 text-xs text-slate-600 bg-slate-50 px-3 py-1 rounded-full">
              <Clock className="w-3 h-3" />
              <span>Typical session: 60-90 minutes</span>
            </div>
          </div>

          {/* Mobile Navigation Footer */}
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3">
            <div className="flex items-center justify-between">
              <button
                onClick={prevStep}
                className="flex items-center space-x-1 px-3 py-1 text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-slate-50 text-sm"
                disabled={currentStep === 0}
              >
                <ArrowRight className="w-3 h-3 rotate-180" />
                <span className="text-xs font-medium">Previous</span>
              </button>

              <div className="bg-slate-100 rounded-full px-3 py-1">
                <span className="text-xs text-slate-700 font-medium">
                  {currentStep + 1} of {totalSteps}
                </span>
              </div>

              <button
                onClick={nextStep}
                className="flex items-center space-x-1 px-3 py-1 text-slate-slate-600 hover:text-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-slate-50 text-sm"
                disabled={currentStep === totalSteps - 1}
              >
                <span className="text-xs font-medium">Next</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      ),
      desktopContent: (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-7xl mx-auto relative pb-20 min-h-[500px]">
          <div className="flex min-h-[500px]">
            {/* Left side - Content */}
            <div className="w-3/5 p-8 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold">
                    5
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900">Experience Your Design</h3>
                </div>

                <div className="space-y-4">
                  <p className="text-xl text-slate-600 leading-relaxed">
                    Step inside your future space and experience it in true dimensions.
                  </p>
                  <p className="text-slate-500">
                    Lay down furniture, put up walls and walk through room layouts to validate your space decisions.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">What You'll Experience</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-slate-700">Test room layouts and proportions</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                      <span className="text-slate-700">Feel spatial relationships</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-purple-600" />
                      <span className="text-slate-700">Make confident decisions</span>
                    </div>
                  </div>
                </div>

                <div className="inline-flex items-center space-x-2 text-sm text-slate-600 bg-slate-50 px-4 py-2 rounded-full">
                  <Clock className="w-4 h-4" />
                  <span>Typical session: 60-90 minutes</span>
                </div>
              </div>
            </div>

            {/* Right side - Video */}
            <div className="w-2/5 relative flex items-center justify-center p-6 bg-gray-50">
              <div className="w-full h-full max-w-md max-h-[400px] flex items-center justify-center">
                <video className="w-full h-full object-cover rounded-lg shadow-sm" autoPlay muted loop playsInline>
                  <source
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9095-1S4PMJX5FkIHmbLkr12YclpU6Hc49w.mov"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
          {/* Card Navigation Footer */}
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={prevStep}
                className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-slate-50"
                disabled={currentStep === 0}
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                <span className="text-sm font-medium">Previous</span>
              </button>

              <div className="bg-slate-100 rounded-full px-4 py-2">
                <span className="text-sm text-slate-700 font-medium">
                  {currentStep + 1} of {totalSteps}
                </span>
              </div>

              <button
                onClick={nextStep}
                className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-slate-50"
                disabled={currentStep === totalSteps - 1}
              >
                <span className="text-sm font-medium">Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ),
    },
  ]

  const currentStepData = steps[currentStep]

  return (
    <section data-section="how-it-works" className="relative py-16 bg-gray-50 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/how-it-works-floor-plans-bg.jpg"
          alt="Architectural floor plans background"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-white/85"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">How It Works</h2>
          <p className="text-slate-600 mt-2">Experience your architectural designs in 5 simple steps</p>
        </div>

        {/* Carousel Container with Navigation */}
        <div className="relative mb-8">
          {/* Main Content - Mobile vs Desktop */}
          <div className="mb-8">
            {/* Mobile Content */}
            <div className="block md:hidden">{currentStepData.mobileContent}</div>

            {/* Desktop Content */}
            <div className="hidden md:block">{currentStepData.desktopContent}</div>
          </div>

          {/* Step Indicator Circles */}
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToStep(index)}
                  className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${
                    index === currentStep ? "bg-slate-900" : "bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function LevelsAndLinesPage() {
  // State for Instagram posts - Start with empty array, only populate from API
  const [instagramPosts, setInstagramPosts] = useState([])

  // Mobile static post - no API needed
  const mobileStaticPost = {
    id: "mobile_static_video",
    type: "video" as const,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9095-IVBM3G3KTFgcBT2psgztYQlpLcNdJn.mov",
    caption: "coming soon toronto;",
    likes: 1,
    comments: 1,
    permalink: "https://instagram.com/levels.and.lines",
  }

  const [postsLoading, setPostsLoading] = useState(false)
  const [postsError, setPostsError] = useState(false)

  // Desktop carousel state only
  const videoRef = useRef<HTMLVideoElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Add a mobile detection state near the top of the component:
  const [isMobile, setIsMobile] = useState(false)

  // Client-side only state
  const [mounted, setMounted] = useState(false)

  // Declare state variables for section tracking and sticky buttons
  const [currentSection, setCurrentSection] = useState<string>("hero")
  const [showStickyButtons, setShowStickyButtons] = useState<boolean>(false)
  const headerRef = useRef<HTMLDivElement>(null)

  // Initialize carousel state variables
  const [currentPostIndex, setCurrentPostIndex] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Fetch Instagram posts from API - DESKTOP ONLY
  useEffect(() => {
    if (!mounted || isMobile) return // Skip API call on mobile

    const fetchInstagramPosts = async () => {
      try {
        console.log("🔄 Fetching Instagram posts from API (Desktop only)...")
        setPostsLoading(true)

        const response = await fetch("/api/instagram-posts", {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache",
          },
        })

        if (!response.ok) {
          throw new Error(`API responded with ${response.status}`)
        }

        const data = await response.json()

        if (data.success && data.data && data.data.length > 0) {
          console.log("✅ Successfully fetched", data.data.length, "Instagram posts")
          console.log(
            "📋 Posts received:",
            data.data.map((p) => ({
              id: p.id,
              type: p.type,
              src: p.src?.substring(0, 50) + "...",
            })),
          )
          setInstagramPosts(data.data)
          setPostsError(false)
        } else {
          console.log("⚠️ No posts found in API response")
          setPostsError(true)
        }
      } catch (error) {
        console.error("❌ Failed to fetch Instagram posts:", error)
        setPostsError(true)
      } finally {
        setPostsLoading(false)
      }
    }

    // Delay the API call slightly to let the page render first
    const timer = setTimeout(fetchInstagramPosts, 1000)
    return () => clearTimeout(timer)
  }, [mounted, isMobile])

  // Add this useEffect after the mounted useEffect
  useEffect(() => {
    if (!mounted) return

    const mobile =
      window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    setIsMobile(mobile)
  }, [mounted])

  // Desktop video interaction handler - simplified
  const handleVideoClick = useCallback(() => {
    if (!mounted || isMobile) return
    console.log("🎬 Desktop video clicked - user interaction")
    // Just log the interaction, let the video play automatically
  }, [mounted, isMobile])

  // Mobile video click handler - much simpler
  const handleMobileVideoClick = useCallback(() => {
    if (!mounted || !isMobile) return

    console.log("📱 Mobile video clicked - attempting to play")
    // Just try to play the video, no carousel logic needed
  }, [mounted, isMobile])

  // Desktop carousel auto-advance - simplified
  useEffect(() => {
    if (!mounted || postsLoading || isMobile || instagramPosts.length === 0) return

    // For image posts, auto-advance after 4 seconds
    const currentPost = instagramPosts[currentPostIndex]
    if (currentPost?.type === "image") {
      const timer = setTimeout(() => {
        const nextIndex = (currentPostIndex + 1) % instagramPosts.length
        console.log("📸 Image timeout - advancing from", currentPostIndex, "to", nextIndex)
        setCurrentPostIndex(nextIndex)
      }, 4000)

      return () => clearTimeout(timer)
    }
    // For videos, let them play and advance when they end naturally
  }, [currentPostIndex, instagramPosts, mounted, postsLoading, isMobile])

  // Get current post - mobile uses static post, desktop uses carousel
  const currentPost = isMobile ? mobileStaticPost : instagramPosts[currentPostIndex] || null

  // Section detection observer - only run client-side
  useEffect(() => {
    if (!mounted) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute("data-section")
            if (sectionId) {
              setCurrentSection(sectionId)
            }
          }
        })
      },
      {
        threshold: 0.5,
        rootMargin: "-100px 0px -100px 0px",
      },
    )

    const sections = document.querySelectorAll("[data-section]")
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [mounted])

  // Scroll observers - only run client-side
  useEffect(() => {
    if (!mounted) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyButtons(!entry.isIntersecting)
      },
      {
        threshold: 0,
        rootMargin: "0px 0px 0px 0px",
      },
    )

    const heroSection = document.querySelector('section[class*="min-h-screen"]')
    if (heroSection) {
      observer.observe(heroSection)
    }

    return () => {
      if (heroSection) {
        observer.unobserve(heroSection)
      }
    }
  }, [mounted])

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Define handleVideoEnded function
  const handleVideoEnded = useCallback(() => {
    if (!mounted || isMobile || instagramPosts.length === 0) return

    console.log("🎬 Desktop video ended - advancing to next post")

    // Advance to next post immediately when video ends
    setTimeout(() => {
      const nextIndex = (currentPostIndex + 1) % instagramPosts.length
      console.log("➡️ Advancing from", currentPostIndex, "to", nextIndex)
      setCurrentPostIndex(nextIndex)
    }, 500) // Small delay for smooth transition
  }, [mounted, isMobile, instagramPosts.length, currentPostIndex])

  return (
    <div className={`min-h-screen bg-white font-sans ${showStickyButtons ? "pb-32 sm:pb-20" : ""}`}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="px-4 md:px-6 max-w-7xl mx-auto">
          <div ref={headerRef} className="flex items-center py-3 md:py-6">
            <LLLogo
              className="h-12 w-auto md:h-20 lg:h-24"
              useWhiteLogo={isMobile || ["hero", "what-why"].includes(currentSection)}
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        data-section="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-20 lg:pt-24"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-background-new.jpg"
            alt="Architectural floor plans being laid out in the Levels and Lines studio"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden relative z-30 w-full h-full flex flex-col">
          {/* Mobile Header Text - Top */}
          <div className="flex-shrink-0 px-4 pt-8 pb-4 text-center text-white">
            <div className="space-y-3">
              <h1 className="text-2xl font-bold tracking-tight leading-tight sm:text-3xl">
                Step Inside Your Future,
                <br />
                <span className="text-slate-300">Before You Build It</span>
              </h1>
              <p className="text-sm text-slate-200 leading-relaxed sm:text-base">
                The Levels and Lines{" "}
                <span className="text-white font-semibold">
                  Design Theater<sup className="text-xs">™</sup>
                </span>{" "}
                lets you experience, touch and feel your space in real life and true dimensions.
              </p>
            </div>
          </div>

          {/* Mobile Single Instagram Post - Middle */}
          <div className="flex-1 flex flex-col items-center justify-center px-4">
            <div className="relative flex items-center justify-center">
              <InstagramPost
                post={mobileStaticPost}
                isActive={true}
                isExpanded={false}
                isPlaying={false}
                onVideoClick={handleMobileVideoClick}
                isMobile={true}
              />
            </div>
          </div>

          {/* Mobile CTA Buttons - Bottom */}
          <div className="flex-shrink-0 px-4 pb-8 pt-4 text-center text-white">
            <div className="flex flex-col gap-2">
              <Button
                size="lg"
                className="text-sm px-4 py-2 bg-white text-slate-900 hover:bg-slate-100 sm:text-base sm:px-6 sm:py-3 shadow-lg border-2 border-black"
              >
                Book Your Full-Scale Walkthrough
                <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-sm px-4 py-2 bg-white border-2 border-black text-black hover:bg-black hover:text-white sm:text-base sm:px-6 sm:py-3 shadow-lg"
              >
                Bring This To Your Clients
                <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop/Tablet Layout */}
        <div className="hidden md:block">
          {/* Instagram Posts Overlay */}
          <div className="absolute inset-0 z-10">
            <div className="flex items-center justify-center h-full px-4">
              <div className="relative flex items-center justify-center space-x-4">
                {postsLoading || instagramPosts.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden w-80 h-96 sm:w-96 sm:h-[500px] flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-gray-600">{postsLoading ? "Loading posts..." : "No posts available"}</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Left partial post */}
                    <div className={`transition-all duration-700 ease-in-out opacity-40 scale-90 z-10`}>
                      <InstagramPost
                        post={instagramPosts[(currentPostIndex - 1 + instagramPosts.length) % instagramPosts.length]}
                        isActive={false}
                        isExpanded={false}
                        isMobile={false}
                      />
                    </div>

                    {/* Main center post */}
                    <div className={`transition-all duration-700 ease-in-out z-30 cursor-pointer`}>
                      <InstagramPost
                        post={currentPost}
                        isActive={true}
                        isExpanded={false}
                        videoRef={videoRef}
                        onVideoEnded={handleVideoEnded}
                        onVideoClick={handleVideoClick}
                        isMobile={false}
                      />
                    </div>

                    {/* Right partial post */}
                    <div className={`transition-all duration-700 ease-in-out opacity-40 scale-90 z-10`}>
                      <InstagramPost
                        post={instagramPosts[(currentPostIndex + 1) % instagramPosts.length]}
                        isActive={false}
                        isExpanded={false}
                        isMobile={false}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Content Overlay */}
          <div className={`relative z-30 px-4 text-center text-white pt-4 transition-all duration-500`}>
            <div className="max-w-4xl mx-auto space-y-6 lg:space-y-8">
              <div className="space-y-4 lg:space-y-6">
                <h1 className="text-4xl font-bold tracking-tight leading-tight lg:text-5xl xl:text-6xl 2xl:text-7xl">
                  Step Inside Your Future,
                  <br />
                  <span className="text-slate-300">Before You Build It</span>
                </h1>
                <p className="text-lg text-slate-200 leading-relaxed lg:text-xl max-w-3xl mx-auto">
                  The Levels and Lines{" "}
                  <span className="text-white font-semibold">
                    Design Theater<sup className="text-xs">™</sup>
                  </span>{" "}
                  lets you experience, touch and feel your space in real life and true dimensions.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3 justify-center sm:flex-row sm:gap-4">
                <Button
                  size="lg"
                  className="text-base px-6 py-3 bg-white text-slate-900 hover:bg-slate-100 md:text-lg md:px-8 shadow-lg border-2 border-black"
                >
                  Book Your Full-Scale Walkthrough
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-6 py-3 bg-white border-2 border-black text-black hover:bg-black hover:text-white md:text-lg md:px-8 shadow-lg"
                >
                  Bring This To Your Clients
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </div>

              {/* Contact Callouts - Below CTA Buttons */}
              <div className="flex justify-between items-center w-full max-w-4xl mx-auto mt-4">
                <a
                  href="https://www.instagram.com/levels.and.lines"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center space-y-1 bg-white/95 backdrop-blur-sm border-2 border-black rounded-lg px-4 py-3 shadow-lg hover:bg-white transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <Image
                      src="/images/instagram-icon-clean.png"
                      alt="Instagram"
                      width={20}
                      height={20}
                      className="mr-2 object-contain"
                    />
                    <span className="text-base font-semibold text-black">@levels.and.lines</span>
                  </div>
                </a>
                <a
                  href="tel:6474LEVELS"
                  className="flex items-center justify-center space-x-2 bg-white/95 backdrop-blur-sm border-2 border-black rounded-lg px-4 py-3 shadow-lg hover:bg-white transition-colors"
                >
                  <Phone className="w-5 h-5 text-black" />
                  <span className="text-base font-semibold text-black">(647) 4LEVELS</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is it / Why Use Levels and Lines Section */}
      <section data-section="what-why" className="relative py-16 bg-slate-900 overflow-hidden">
        {/* Floor projection background - the actual technology in action */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/floor-projection-background.jpg"
            alt="Floor projection showing architectural plans in the Design Theater"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-slate-900/85"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          {/* Section Headers */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl mb-4">
              Experience Architecture Like Never Before
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Step into your future space with our revolutionary Design Theater™ technology
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Side - What Is It */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h3 className="text-3xl font-bold text-white md:text-4xl mb-8 pb-4 border-b-2 border-blue-500">
                  What Is It
                </h3>
              </div>

              <div className="space-y-6">
                {/* First bullet point */}
                <div className="flex items-start space-x-4 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">Floor Projection</h4>
                    <p className="text-lg text-slate-300">Your plans, projected on the floor in full-size dimensions</p>
                  </div>
                </div>

                {/* Second bullet point */}
                <div className="flex items-start space-x-4 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">Physical Elements</h4>
                    <p className="text-lg text-slate-300">
                      Real size walls and furniture to give a true sense of space
                    </p>
                  </div>
                </div>

                {/* Third bullet point */}
                <div className="flex items-start space-x-4 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">Wall Projections</h4>
                    <p className="text-lg text-slate-300">
                      Additional floor to ceiling projection to showcase 3D renderings, elevations and more
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Why Use Levels and Lines */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h3 className="text-3xl font-bold text-white md:text-4xl mb-8 pb-4 border-b-2 border-yellow-500">
                  Why Use Levels and Lines
                </h3>
              </div>

              <div className="space-y-6">
                {/* First bullet point */}
                <div className="flex items-start space-x-4 p-6 bg-yellow-500/10 backdrop-blur-sm rounded-xl border border-yellow-500/20 hover:bg-yellow-500/20 transition-colors">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-slate-900" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">Save Money</h4>
                    <p className="text-lg text-slate-300">Catch costly mistakes before construction begins</p>
                  </div>
                </div>

                {/* Second bullet point */}
                <div className="flex items-start space-x-4 p-6 bg-yellow-500/10 backdrop-blur-sm rounded-xl border border-yellow-500/20 hover:bg-yellow-500/20 transition-colors">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-slate-900" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">Team Alignment</h4>
                    <p className="text-lg text-slate-300">
                      Generate full team alignment - builders, trades, architects, designers and more
                    </p>
                  </div>
                </div>

                {/* Third bullet point */}
                <div className="flex items-start space-x-4 p-6 bg-yellow-500/10 backdrop-blur-sm rounded-xl border border-yellow-500/20 hover:bg-yellow-500/20 transition-colors">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-slate-900" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">Fall In Love</h4>
                    <p className="text-lg text-slate-300">
                      Experience and fall in love with your space before it is real
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorksCarousel />

      {/* An Important Part of the Architectural Journey Section */}
      <section data-section="architectural-journey" className="relative py-16 bg-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/design-theater-in-action.jpg"
            alt="Design Theater showing floor and wall projections of architectural plans in action"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-white/90"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl mb-4">
              An Important Part of the Architectural Journey
            </h2>
            <p className="text-lg text-slate-600 max-w-4xl mx-auto">
              Whether for homes, offices, retail spaces, corporate headquarters, commercial spaces or industrial ones,
              we amplify your expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Residential */}
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Home className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Residential</h3>
              <p className="text-slate-600 text-lg">Test kitchen layouts, hallway widths, bedroom flows</p>
            </div>

            {/* Retail */}
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Store className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Retail</h3>
              <p className="text-slate-600 text-lg">Visualize customer traffic, optimize shelving</p>
            </div>

            {/* Commercial */}
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Commercial</h3>
              <p className="text-slate-600 text-lg">Get full stakeholder alignment before construction</p>
            </div>

            {/* Corporate */}
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building2 className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Corporate</h3>
              <p className="text-slate-600 text-lg">
                Build team excitement while validating workstation flow and meeting room design
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section data-section="pricing" className="relative py-16 bg-slate-50 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/floor-projection-pricing-bg.jpg"
            alt="Detailed floor projection showing room layouts and measurements in the Design Theater"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-white/85"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl mb-4">Investment & Pricing</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Every project is unique, and our pricing reflects the custom nature of your architectural visualization
              experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Left side - Pricing Factors */}
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">What Influences Pricing</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Total Square Footage</h4>
                    <p className="text-slate-600 text-sm">
                      Larger spaces require more projection setup and coordination
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Number of Rooms</h4>
                    <p className="text-slate-600 text-sm">Each space requires individual customization and setup</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Complexity Level</h4>
                    <p className="text-slate-600 text-sm">Multi-floor layouts and detailed customizations</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Session Duration</h4>
                    <p className="text-slate-600 text-sm">Comprehensive walkthroughs with multiple stakeholders</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - What's Included */}
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">What's Included</h3>
              <div className="space-y-6">
                {/* Removed Downtown Toronto Residential section */}

                <div className="bg-slate-50/80 backdrop-blur-sm rounded-lg p-4">
                  <ul className="text-sm text-slate-600 space-y-2">
                    <li>• Complete project setup and customization</li>
                    <li>• Full-scale floor and wall projections</li>
                    <li>• Physical furniture and wall elements</li>
                    <li>• 60-90 minute guided walkthrough session</li>
                    <li>• Full session recording</li>
                    <li>• Marked up PDF with notes for further revisions</li>
                  </ul>
                </div>

                {/* Removed text section at the bottom */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Experience Your Design? Section */}
      <section data-section="ready-to-experience" className="w-full bg-slate-900 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">Ready to Experience Your Design?</h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto md:text-xl">
              Book your full-scale walkthrough experience today.
            </p>

            <div className="bg-slate-800 rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-slate-300 mb-4">Book 2-4 weeks in advance or more</p>
              <Button
                size="lg"
                className="text-base px-8 py-4 bg-white text-slate-900 hover:bg-slate-100 md:text-lg md:px-10 md:py-5 shadow-lg"
                onClick={() => mounted && window.open("https://levelsandlines.com/book", "_blank")}
              >
                Online Booking
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Buttons - Show when hero section is out of view */}
      {showStickyButtons && (
        <div className="fixed bottom-4 left-4 right-4 z-50 flex flex-col gap-2 sm:flex-row sm:justify-center sm:gap-3">
          <Button
            size="lg"
            className="text-sm px-4 py-2 bg-white border-2 border-slate-900 text-slate-900 hover:bg-slate-100 shadow-lg sm:text-base sm:px-6 sm:py-3"
          >
            Book Walkthrough
            <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-sm px-4 py-2 bg-white border-2 border-slate-900 text-slate-900 hover:bg-slate-100 shadow-lg sm:text-base sm:px-6 sm:py-3"
          >
            Bring This To Your Clients
            <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-sm px-4 py-2 bg-white border-2 border-slate-900 text-slate-900 hover:bg-slate-100 shadow-lg sm:text-base sm:px-6 sm:py-3"
            onClick={() => mounted && window.open("https://www.instagram.com/levels.and.lines", "_blank")}
          >
            <Image
              src="/images/instagram-icon-clean.png"
              alt="Instagram"
              width={20}
              height={20}
              className="mr-2 object-contain"
            />
            @levels.and.lines
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-sm px-4 py-2 bg-white border-2 border-slate-900 text-slate-900 hover:bg-slate-100 shadow-lg sm:text-base sm:px-6 sm:py-3"
            onClick={() => mounted && window.open("tel:6474LEVELS", "_self")}
          >
            <Phone className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            (647) 4LEVELS
          </Button>
        </div>
      )}
    </div>
  )
}
