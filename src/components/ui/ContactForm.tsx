"use client"

import { useState } from "react"
import { Button } from "./button"
import { sendEmailAction } from "@/app/actions/contact"
import { X } from "lucide-react"

export function ContactFormDialog({ 
  label = "SEND EMAIL",
  variant = "default",
  size = "default",
  className = "bg-black text-white hover:bg-black/80 shadow-[4px_4px_0_0_#fff] border-black"
}: { 
  label?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    const formData = new FormData(e.currentTarget)
    const result = await sendEmailAction(null, formData)
    
    if (result.success) {
      setStatus("success")
      e.currentTarget.reset()
      setTimeout(() => {
        setIsOpen(false)
        setStatus("idle")
      }, 4000)
    } else {
      setStatus("error")
    }
  }

  return (
    <>
      <Button 
        variant={variant} 
        size={size}
        className={className} 
        onClick={() => setIsOpen(true)}
      >
        {label}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-neo-bg border-4 border-neo-accent shadow-[16px_16px_0_0_#FF4500] p-8 max-w-md w-full relative">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 hover:text-neo-accent transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-3xl font-black uppercase mb-6 tracking-tight">Send a Message</h3>
            
            {status === "success" ? (
              <div className="bg-[#111] border-2 border-green-500 p-6 text-center text-green-500 font-mono shadow-[8px_8px_0_0_#22c55e]">
                MESSAGE SENT SUCCESSFULLY.<br/><br/> I WILL GET BACK TO YOU SOON.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="name" className="font-mono text-sm uppercase text-neo-muted">Name</label>
                  <input required type="text" id="name" name="name" className="bg-transparent border-2 border-neo-border focus:border-neo-accent outline-none p-3 font-mono text-sm placeholder:text-neo-muted/50 transition-colors" placeholder="Your Name" />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="font-mono text-sm uppercase text-neo-muted">Email</label>
                  <input required type="email" id="email" name="email" className="bg-transparent border-2 border-neo-border focus:border-neo-accent outline-none p-3 font-mono text-sm placeholder:text-neo-muted/50 transition-colors" placeholder="your@email.com" />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="message" className="font-mono text-sm uppercase text-neo-muted">Message</label>
                  <textarea required id="message" name="message" rows={4} className="bg-transparent border-2 border-neo-border focus:border-neo-accent outline-none p-3 font-mono text-sm placeholder:text-neo-muted/50 transition-colors resize-none" placeholder="Enter your message here" />
                </div>
                {status === "error" && (
                  <p className="text-red-500 font-mono text-sm uppercase">Error: Failed to send message.</p>
                )}
                <Button 
                    type="submit" 
                    disabled={status === "loading"} 
                    className="mt-2 w-full"
                >
                  {status === "loading" ? "SENDING..." : "SEND MESSAGE"}
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
