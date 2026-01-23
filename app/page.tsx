// ============================================================================
// LANDING PAGE - Main Marketing/Welcome Page
// ============================================================================
// This is the main landing page that introduces MediLog to new users
// Features include hero section, feature highlights, how-it-works explanation,
// testimonials, and call-to-action buttons for registration/login

"use client"

import Link from "next/link"                                     // Next.js navigation component
import { Button } from "@/components/ui/button"                  // Reusable button component
import { ArrowRight, Brain, Clock, FileText, Shield, LogIn } from "lucide-react" // Icon components
import { motion } from "framer-motion"                           // Animation library
import  Notification  from "@/app/Notifications";               // Notification component

// ============================================================================
// LANDING PAGE MAIN COMPONENT
// ============================================================================
export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* ============================================================================ */}
      {/* HEADER SECTION - Navigation and Brand */}
      {/* ============================================================================ */}
      <header className="border-b bg-deep-teal text-white">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          
          {/* Brand Logo and Name */}
          <div className="flex items-center gap-2 font-bold text-xl">
            <Brain className="h-6 w-6" />              {/* Brain icon representing AI/medical intelligence */}
            <span>MediLog</span>                       {/* Application name */}
          </div>
          
          {/* Navigation Menu - Hidden on mobile */}
          <nav className="hidden md:flex gap-6">
            <Link
              href="#features"
              className="text-sm font-medium text-white/80 hover:text-white hover:underline underline-offset-4"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-white/80 hover:text-white hover:underline underline-offset-4"
            >
              How It Works
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-white/80 hover:text-white hover:underline underline-offset-4"
            >
              Testimonials
            </Link>
          </nav>
          
          {/* Authentication Buttons */}
          <div className="flex items-center gap-4">
            {/* Login Button */}
            <Link href="/auth/login">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="bg-cool-cyan hover:bg-cool-cyan hover:text-white hover:border-cool-cyan transition-all duration-300 flex items-center gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Log In</span>
                </Button>
              </motion.div>
            </Link>
            {/* Sign Up Button */}
            <Link href="/auth/register">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-cool-cyan hover:bg-cool-cyan/90 text-white transition-all duration-300 shadow-md hover:shadow-lg">
                  Sign Up
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </header>
      
      {/* ============================================================================ */}
      {/* MAIN CONTENT AREA */}
      {/* ============================================================================ */}
      <main className="flex-1">
        
        {/* ============================================================================ */}
        {/* HERO SECTION - Primary Value Proposition */}
        {/* ============================================================================ */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-soft-gray">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              
              {/* Hero Text Content */}
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  {/* Main Headline */}
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-deep-teal">
                    Streamline Your Medical Interactions
                  </h1>
                  {/* Value Proposition Description */}
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    MediLog is an AI-powered platform designed to assist both doctors/caregivers and patients in
                    logging, managing, and summarizing medical interactions.
                  </p>
                </div>
                
                {/* Call-to-Action Buttons */}
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  {/* Primary CTA - Get Started */}
                  <Link href="/auth/register">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="lg"
                        className="gap-1 bg-deep-teal hover:bg-deep-teal/90 transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        Get Started <ArrowRight className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </Link>
                  {/* Secondary CTA - Learn More */}
                  <Link href="#how-it-works">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-cool-cyan text-cool-cyan hover:bg-cool-cyan hover:text-white transition-all duration-300"
                      >
                        Learn More
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </div>
              
              {/* Hero Image/Visual */}
              <div className="flex items-center justify-center">
                <img
                  alt="MediLog Dashboard Preview"
                  className="aspect-video overflow-hidden rounded-xl object-cover object-center shadow-elevated"
                  src="/home.jpg?height=550&width=800"
                />
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-deep-teal px-3 py-1 text-sm text-white">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-deep-teal">
                  Everything You Need for Medical Documentation
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  MediLog provides an intuitive user experience, efficient data handling, and AI-powered summarization
                  to streamline clinical documentation.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-10">
              <div className="grid gap-6">
                <div className="flex gap-4 items-start card-elevation p-4 rounded-lg">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-deep-teal text-white">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-deep-teal">Voice-to-Text Transcription</h3>
                    <p className="text-muted-foreground">
                      Record medical interactions with real-time voice-to-text transcription, making documentation
                      effortless.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start card-elevation p-4 rounded-lg">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-deep-teal text-white">
                    <Brain className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-deep-teal">AI-Powered Summarization</h3>
                    <p className="text-muted-foreground">
                      Get AI-generated summaries of medical interactions, highlighting key information and medical
                      terms.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start card-elevation p-4 rounded-lg">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-deep-teal text-white">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-deep-teal">Medicine Reminders</h3>
                    <p className="text-muted-foreground">
                      Set medication reminders and receive timely notifications to ensure proper medication adherence.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid gap-6">
                <div className="flex gap-4 items-start card-elevation p-4 rounded-lg">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-deep-teal text-white">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-deep-teal">Secure & Private</h3>
                    <p className="text-muted-foreground">
                      Your medical data is encrypted and protected with role-based access control for maximum security.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start card-elevation p-4 rounded-lg">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-deep-teal text-white">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-deep-teal">Flashcard Management</h3>
                    <p className="text-muted-foreground">
                      Create and review medical flashcards for quick reference to important health information.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start card-elevation p-4 rounded-lg">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-deep-teal text-white">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-deep-teal">Advanced Search</h3>
                    <p className="text-muted-foreground">
                      Easily find past medical interactions with powerful search and filtering capabilities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-soft-gray">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-deep-teal">
                  How MediLog Works
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  MediLog simplifies the process of recording, managing, and accessing medical information.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 text-center bg-white shadow-card hover:shadow-elevated transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-deep-teal text-lg font-bold text-white">
                  1
                </div>
                <h3 className="text-xl font-bold text-deep-teal">Record</h3>
                <p className="text-muted-foreground">
                  Record medical interactions using voice-to-text or manual entry.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 text-center bg-white shadow-card hover:shadow-elevated transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-deep-teal text-lg font-bold text-white">
                  2
                </div>
                <h3 className="text-xl font-bold text-deep-teal">Summarize</h3>
                <p className="text-muted-foreground">
                  Get AI-generated summaries highlighting key medical information.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 text-center bg-white shadow-card hover:shadow-elevated transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-deep-teal text-lg font-bold text-white">
                  3
                </div>
                <h3 className="text-xl font-bold text-deep-teal">Access</h3>
                <p className="text-muted-foreground">
                  Easily access and manage your medical records anytime, anywhere.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-deep-teal text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to Streamline Your Medical Documentation?
                </h2>
                <p className="max-w-[900px] text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of healthcare professionals and patients who trust MediLog.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/auth/register">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      className="gap-1 bg-cool-cyan hover:bg-cool-cyan/90 text-white transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </Link>
                <Link href="#features">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-white border-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-deep-teal transition-all duration-300"
                    >
                      Learn More
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <Notification />
      </main>
      <footer className="border-t bg-deep-teal text-white">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex items-center gap-2 font-bold">
            <Brain className="h-6 w-6" />
            <span>MediLog</span>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link
              href="#"
              className="text-sm font-medium text-white/80 hover:text-white hover:underline underline-offset-4"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-white/80 hover:text-white hover:underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-white/80 hover:text-white hover:underline underline-offset-4"
            >
              Contact Us
            </Link>
          </nav>
          <div className="text-sm text-white/70">© {new Date().getFullYear()} MediLog. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}

