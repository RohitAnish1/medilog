# MediLog - Code Structure and Architecture Guide

## Overview
MediLog is an AI-powered medical interaction logging platform built with Next.js, TypeScript, and React. This document provides a comprehensive explanation of the codebase structure and main components.

## 🏗️ Architecture Overview

### **Frontend Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for responsive design
- **UI Components**: Custom components built with Radix UI primitives
- **State Management**: React Context for authentication
- **Animations**: Framer Motion for smooth transitions

### **Backend Services**
- **AI Integration**: Google Gemini AI for text summarization
- **Database**: Firebase Firestore (configured but commented out)
- **Authentication**: Custom implementation with localStorage persistence

## 📁 File Structure Explanation

### Core Application Files

#### `app/layout.tsx` - Root Layout Component
**Purpose**: Main application wrapper that provides global functionality
- **Theme Management**: Light/dark mode support via ThemeProvider
- **Authentication Context**: Wraps entire app with auth state management
- **Global Components**: AI chatbot and toast notifications available everywhere
- **Font Configuration**: Inter font for consistent typography

#### `app/page.tsx` - Landing Page
**Purpose**: Marketing/welcome page for new users
- **Hero Section**: Value proposition and call-to-action buttons
- **Feature Highlights**: Key platform capabilities
- **Navigation**: Header with login/signup options
- **Responsive Design**: Mobile-first approach with animations

#### `app/api/chat/route.ts` - AI Chat API
**Purpose**: Backend endpoint for AI assistant functionality
- **Streaming Responses**: Real-time chat experience using Vercel AI SDK
- **Pattern Matching**: Context-aware responses based on user keywords
- **Feature Guidance**: Helps users understand MediLog capabilities
- **Mock Implementation**: Simulates AI responses (ready for OpenAI integration)

### Authentication System

#### `components/auth-provider.tsx` - Authentication Context
**Purpose**: Manages user authentication state throughout the application
- **User Session Management**: Login, registration, and logout functionality
- **Role-Based Access**: Separate dashboards for patients and caregivers
- **Route Protection**: Automatic redirects based on authentication status
- **Local Storage Persistence**: Maintains user session across browser sessions

#### `app/auth/login/page.tsx` - Login Interface
**Purpose**: User authentication form
- **Role Selection**: Choose between patient or caregiver account
- **Form Validation**: Email/password input with error handling
- **Loading States**: Visual feedback during authentication process
- **Toast Notifications**: Success/error messages for user feedback

### Dashboard System

#### `app/dashboard/patient/page.tsx` - Patient Dashboard
**Purpose**: Main interface for patient users
- **Quick Actions Grid**: Primary feature access (recording, flashcards, reminders)
- **Medication Reminders**: Upcoming medication schedule display
- **Recent Interactions**: Medical history preview
- **Personalized Welcome**: User-specific greeting and information

#### `components/dashboard-layout.tsx` - Dashboard Wrapper
**Purpose**: Shared layout structure for all dashboard pages
- **Responsive Sidebar**: Navigation menu with role-based items
- **User Menu**: Profile access and logout functionality
- **Mobile Support**: Collapsible navigation for smaller screens
- **Active Route Highlighting**: Visual indication of current page

### AI Features

#### `components/ai-chatbot.tsx` - AI Assistant Interface
**Purpose**: Interactive help system for users
- **Real-time Chat**: Streaming responses using Vercel AI SDK
- **Window Controls**: Minimize, maximize, and close functionality
- **Page-Specific Visibility**: Only shows on landing page
- **Voice Input Placeholder**: Future feature for voice interaction
- **Auto-scroll**: Keeps latest messages visible

#### `summery.js` - AI Summarization Module
**Purpose**: Text processing using Google Gemini AI
- **Medical Text Summarization**: Converts interactions into concise summaries
- **Structured Output**: Formats summaries for flashcard creation
- **Error Handling**: Graceful fallbacks when AI processing fails
- **Flashcard Integration**: Automatic conversion to study materials

### Voice Recording System

#### `app/record/page.tsx` - Voice Recording Interface
**Purpose**: Voice-to-text medical interaction recording
- **Web Speech API**: Real-time speech recognition
- **Transcript Editing**: Manual text editing capabilities
- **AI Integration**: Automatic summarization of recorded content
- **Flashcard Creation**: Convert recordings to study materials
- **Tab Interface**: Organized workflow for recording → summary → flashcards

### Utility Functions

#### `lib/utils.ts` - Helper Functions
**Purpose**: Common utility functions for the application
- **Class Name Management**: Smart CSS class merging with Tailwind
- **Conditional Styling**: Clean conditional class application
- **Type Safety**: TypeScript support for class value handling

#### `lib/firebase.ts` - Database Configuration
**Purpose**: Firebase/Firestore integration setup
- **Database Connection**: Firestore configuration for data storage
- **Flashcard Operations**: Save and retrieve flashcard data
- **Error Handling**: Graceful error management for database operations
- **Test Functions**: Development utilities for database testing

## 🔧 Key Technologies Explained

### **Next.js App Router**
- File-based routing system
- Server and client components
- Built-in API routes for backend functionality

### **TypeScript Integration**
- Type safety throughout the codebase
- Interface definitions for component props
- Improved developer experience with IntelliSense

### **Tailwind CSS**
- Utility-first CSS framework
- Responsive design with mobile-first approach
- Custom color scheme for medical theme

### **React Context Pattern**
- Authentication state management
- Theme management
- Global state sharing without prop drilling

### **AI Integration Points**
- Google Gemini for text summarization
- Vercel AI SDK for chat functionality
- Web Speech API for voice recognition

## 🏥 Medical-Specific Features

### **Role-Based Access Control**
- **Patients**: Focus on personal health management
- **Caregivers**: Enhanced features for patient care

### **Medical Interaction Workflow**
1. **Voice Recording**: Capture doctor-patient conversations
2. **Transcript Generation**: Convert speech to text
3. **AI Summarization**: Extract key medical information
4. **Flashcard Creation**: Transform summaries into study materials
5. **Search & Retrieval**: Find past interactions and information

### **Data Structure**
- **User Profiles**: Role-based user management
- **Medical Records**: Structured interaction storage
- **Flashcards**: Educational content organization
- **Medication Reminders**: Scheduling and notification system

## 🛡️ Security Considerations

### **Authentication**
- Session management with secure token storage
- Role-based route protection
- Automatic session validation

### **Data Privacy**
- Local storage for development (production would use secure backend)
- API key management (environment variables recommended)
- User data isolation by role and permissions

## 🚀 Deployment Ready Features

### **Production Considerations**
- Environment variable configuration
- Firebase integration ready for activation
- Responsive design for all devices
- Error handling and fallback states
- Loading states for better UX

### **Scalability Features**
- Component-based architecture
- Reusable UI components
- Modular feature organization
- Type-safe development environment

This codebase represents a production-ready medical application with comprehensive features for healthcare interaction management, AI-powered assistance, and user-friendly interfaces for both patients and healthcare providers.
