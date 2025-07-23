/*
 * AI Web Crawler Chat Widget - Professional Design
 * Combines whisper-wisdom design with optimized backend streaming
 */

(function() {
    'use strict';
    
    // Default configuration
    const defaultConfig = {
        apiUrl: 'http://localhost:8000/chat',
        proxyUrl: null, // New: Support for secure proxy URLs
        urls: [],
        companyName: 'Assistant',
        position: 'bottom-right',
        autoOpen: false,
        showWelcome: true
    };
    
    // Widget state
    let config = { ...defaultConfig };
    let isInitialized = false;
    let markedLoaded = false;
    
    // Dynamic script loading for Marked.js
    function loadMarkedJS() {
        return new Promise((resolve, reject) => {
            // Check if already loaded
            if (typeof marked !== 'undefined') {
                markedLoaded = true;
                console.log('Marked.js already available');
                resolve();
                return;
            }
            
            // Create script element
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
            script.onload = () => {
                markedLoaded = true;
                console.log('Marked.js loaded successfully');
                resolve();
            };
            script.onerror = () => {
                console.error('Failed to load Marked.js');
                reject(new Error('Failed to load Marked.js'));
            };
            
            // Add to head
            document.head.appendChild(script);
        });
    }
    
    // Create widget HTML with exact whisper-wisdom design
    function createWidget() {
        const widgetContainer = document.createElement('div');
        widgetContainer.innerHTML = `
            <style>
                /* Reset and base styles */
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                /* Widget container */
                .chat-widget {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 10000;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                }

                /* Chat bubble trigger */
                .chat-bubble {
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(135deg, #353535, #000000);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: 0 4px 20px rgba(53, 53, 53, 0.3);
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }

                .chat-bubble:hover {
                    transform: scale(1.1);
                    box-shadow: 0 6px 25px rgba(53, 53, 53, 0.4);
                }

                .chat-bubble::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    transition: left 0.5s;
                }

                .chat-bubble:hover::before {
                    left: 100%;
                }

                .chat-icon {
                    width: 24px;
                    height: 24px;
                    fill: white;
                    transition: transform 0.3s ease;
                }

                .chat-bubble.active .chat-icon {
                    transform: rotate(180deg);
                }

                /* Chat window - larger and expandable */
                .chat-window {
                    position: absolute;
                    bottom: 80px;
                    right: 0;
                    width: 500px;
                    height: 700px;
                    max-width: calc(100vw - 40px);
                    max-height: calc(100vh - 120px);
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                    display: none;
                    flex-direction: column;
                    overflow: hidden;
                    transform: scale(0.95);
                    opacity: 0;
                    transition: all 0.3s ease;
                    resize: both;
                    min-width: 400px;
                    min-height: 500px;
                }

                .chat-window.expanded {
                    width: 800px;
                    height: 600px;
                }

                .chat-window.active {
                    display: flex;
                    transform: scale(1);
                    opacity: 1;
                }

                /* Chat header */
                .chat-header {
                    background: linear-gradient(135deg, #353535, #000000);
                    color: white;
                    padding: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-shrink: 0;
                }

                .chat-header-left {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }

                .chat-header-right {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .chat-header h3 {
                    font-size: 18px;
                    font-weight: 600;
                }

                .chat-header p {
                    font-size: 14px;
                    opacity: 0.9;
                    margin-top: 2px;
                }

                .expand-btn, .close-btn, .clear-btn {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 18px;
                    cursor: pointer;
                    opacity: 0.8;
                    transition: opacity 0.2s;
                    padding: 4px;
                }

                .expand-btn:hover, .close-btn:hover, .clear-btn:hover {
                    opacity: 1;
                }

                .close-btn {
                    font-size: 24px;
                }

                /* Chat messages */
                .chat-messages {
                    flex: 1;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 0;
                }

                .message {
                    animation: fadeInUp 0.3s ease;
                }

                /* User message with minimal rectangle box */
                .message.user {
                    padding: 16px 20px;
                    display: flex;
                    justify-content: flex-end;
                    background: transparent;
                }

                .user-message-bubble {
                    background: #f8f9fa;
                    color: #333;
                    padding: 12px 16px;
                    border-radius: 8px;
                    max-width: 80%;
                    position: relative;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    border: 1px solid #e9ecef;
                }

                .user-message-content {
                    font-size: 14px;
                    line-height: 1.5;
                    margin: 0;
                }

                /* Bot message - full width, no bubble */
                .message.bot {
                    padding: 0;
                    background: white;
                    border-bottom: 1px solid #e9ecef;
                }

                /* AI Response full width layout */
                .ai-response {
                    width: 100%;
                }

                .response-section {
                    padding: 20px;
                    border-bottom: 1px solid #e9ecef;
                }

                .response-section:last-child {
                    border-bottom: none;
                }

                .response-section h4 {
                    font-size: 12px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    color: #6c757d;
                    margin-bottom: 12px;
                }

                /* Collapsible reasoning section */
                .reasoning-container {
                    margin-bottom: 0;
                }

                .reasoning-toggle {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    cursor: pointer;
                    padding: 16px 20px;
                    background: #f8f9fa;
                    border-bottom: 1px solid #e9ecef;
                    transition: background-color 0.2s;
                    width: 100%;
                }

                .reasoning-toggle:hover {
                    background: #e9ecef;
                }

                .reasoning-toggle h4 {
                    flex: 1;
                    margin: 0;
                    font-size: 13px;
                    font-weight: 600;
                    color: #495057;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .reasoning-toggle .chevron {
                    width: 16px;
                    height: 16px;
                    transition: transform 0.2s;
                    fill: #495057;
                }

                .reasoning-toggle.expanded .chevron {
                    transform: rotate(180deg);
                }

                .reasoning-content {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.1s ease-out;
                    background: #f8f9fa;
                    border-bottom: 1px solid #e9ecef;
                }

                .reasoning-content.expanded {
                    max-height: 300px;
                    overflow-y: auto;
                }

                .reasoning-content-inner {
                    padding: 20px;
                    font-size: 14px;
                    line-height: 1.6;
                    color: #495057;
                }

                /* Content section styling */
                .content-section {
                    background: white;
                }

                .content-section h4 {
                    color: #212529;
                }

                .content-text {
                    font-size: 14px;
                    line-height: 1.6;
                    color: #333;
                }

                /* Sources section - collapsible dropdown */
                .sources-container {
                    margin-bottom: 0;
                }

                .sources-toggle {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    cursor: pointer;
                    padding: 16px 20px;
                    background: #f8f9fa;
                    border-bottom: 1px solid #e9ecef;
                    transition: background-color 0.2s;
                    width: 100%;
                }

                .sources-toggle:hover {
                    background: #e9ecef;
                }

                .sources-toggle h4 {
                    flex: 1;
                    margin: 0;
                    font-size: 13px;
                    font-weight: 600;
                    color: #495057;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .sources-toggle .chevron {
                    width: 16px;
                    height: 16px;
                    transition: transform 0.2s;
                    fill: #495057;
                }

                .sources-toggle.expanded .chevron {
                    transform: rotate(180deg);
                }

                .sources-content {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.3s ease-out;
                    background: #f8f9fa;
                    border-bottom: 1px solid #e9ecef;
                }

                .sources-content.expanded {
                    max-height: 200px;
                    overflow-y: auto;
                }

                .sources-content-inner {
                    padding: 20px;
                }

                .source-link {
                    display: block;
                    color: #353535;
                    text-decoration: none;
                    margin-bottom: 8px;
                    font-size: 13px;
                    padding: 4px 0;
                }

                .source-link:hover {
                    color: #000000;
                    text-decoration: underline;
                }

                /* Markdown styles */
                .content-text h1, .content-text h2, .content-text h3 {
                    margin-bottom: 12px;
                    color: #212529;
                    font-weight: 600;
                }

                .content-text h1 { font-size: 20px; }
                .content-text h2 { font-size: 18px; }
                .content-text h3 { font-size: 16px; }

                .content-text p {
                    margin-bottom: 12px;
                }

                .content-text ul, .content-text ol {
                    margin-left: 20px;
                    margin-bottom: 12px;
                }

                .content-text li {
                    margin-bottom: 4px;
                }

                .content-text code {
                    background: #f1f3f4;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-family: 'Monaco', 'Courier New', monospace;
                    font-size: 13px;
                }

                .content-text pre {
                    background: #f8f9fa;
                    padding: 16px;
                    border-radius: 6px;
                    overflow-x: auto;
                    margin: 12px 0;
                    border: 1px solid #e9ecef;
                }

                .content-text blockquote {
                    border-left: 4px solid #dee2e6;
                    padding-left: 16px;
                    margin: 12px 0;
                    font-style: italic;
                    color: #6c757d;
                }

                .content-text strong {
                    font-weight: 600;
                }

                /* Markdown table styles */
                .content-text .markdown-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 12px 0;
                    font-size: 13px;
                    background: white;
                    border: 1px solid #e9ecef;
                    border-radius: 6px;
                    overflow: hidden;
                }

                .content-text .markdown-table th,
                .content-text .markdown-table td {
                    padding: 8px 12px;
                    text-align: left;
                    border-bottom: 1px solid #e9ecef;
                    vertical-align: top;
                }

                .content-text .markdown-table th {
                    background: #f8f9fa;
                    font-weight: 600;
                    color: #495057;
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .content-text .markdown-table tr:last-child td {
                    border-bottom: none;
                }

                .content-text .markdown-table tr:nth-child(even) {
                    background: #f8f9fa;
                }

                .content-text .markdown-table tr:hover {
                    background: #e9ecef;
                }

                /* Chat input */
                .chat-input {
                    padding: 20px;
                    border-top: 1px solid #e9ecef;
                    background: white;
                    flex-shrink: 0;
                }

                .input-container {
                    display: flex;
                    gap: 12px;
                    align-items: flex-end;
                }

                .chat-input textarea {
                    flex: 1;
                    border: 1px solid #e9ecef;
                    border-radius: 20px;
                    padding: 12px 16px;
                    font-size: 14px;
                    font-family: inherit;
                    resize: none;
                    outline: none;
                    transition: border-color 0.2s;
                    max-height: 100px;
                    cursor: text;
                    caret-color: #333;
                    color: #333;
                    background-color: #fff;
                }

                .chat-input textarea:focus {
                    border-color: #353535;
                    cursor: text;
                    caret-color: #353535;
                }

                .chat-input textarea::placeholder {
                    color: #999;
                    opacity: 1;
                }

                .send-btn {
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, #353535, #000000);
                    border: none;
                    border-radius: 50%;
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.2s;
                }

                .send-btn:hover {
                    transform: scale(1.1);
                }

                .send-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                    transform: none;
                }

                /* Loading indicator */
                .loading {
                    display: flex;
                    gap: 4px;
                    padding: 20px;
                    justify-content: center;
                }

                .loading-dot {
                    width: 6px;
                    height: 6px;
                    background: #6c757d;
                    border-radius: 50%;
                    animation: loadingPulse 1.4s infinite ease-in-out;
                }

                .loading-dot:nth-child(1) { animation-delay: -0.32s; }
                .loading-dot:nth-child(2) { animation-delay: -0.16s; }

                /* Crawling loader */
                .crawling-loader {
                    padding: 20px;
                    border-bottom: 1px solid #e9ecef;
                    background: #f8f9fa;
                }

                .crawling-status {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 12px;
                }

                .crawling-text {
                    font-size: 14px;
                    color: #6c757d;
                    font-weight: 500;
                }

                .crawling-loader .loading {
                    padding: 0;
                }

                /* Streaming cursor */
                .streaming-cursor {
                    color: #1a1a1a;
                    font-weight: bold;
                    animation: chatWidgetBlink 1s infinite;
                }

                /* Animations */
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes loadingPulse {
                    0%, 80%, 100% {
                        transform: scale(0);
                        opacity: 0.5;
                    }
                    40% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                @keyframes chatWidgetBlink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }

                /* Mobile responsiveness */
                @media (max-width: 768px) {
                    .chat-widget {
                        right: 20px;
                    }
                    
                    .chat-window {
                        width: calc(100vw - 40px);
                        height: calc(100vh - 100px);
                        bottom: 80px;
                        right: 20px;
                        resize: none;
                    }

                    .chat-window.expanded {
                        width: calc(100vw - 40px);
                        height: calc(100vh - 100px);
                    }
                    
                    .user-message-bubble {
                        max-width: 90%;
                    }
                }

                @media (max-width: 480px) {
                    .chat-window {
                        width: calc(100vw - 20px);
                        right: 10px;
                    }

                    .chat-window.expanded {
                        width: calc(100vw - 20px);
                    }
                }
            </style>

            <div class="chat-widget">
                <!-- Chat bubble trigger -->
                <div class="chat-bubble" id="chatBubble">
                    <svg class="chat-icon" viewBox="0 0 24 24">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                    </svg>
                </div>

                <!-- Chat window -->
                <div class="chat-window" id="chatWindow">
                    <!-- Header -->
                    <div class="chat-header">
                        <div class="chat-header-left">
                            <div>
                                <h3>AI Assistant</h3>
                                <p>Ask me anything!</p>
                            </div>
                        </div>
                        <div class="chat-header-right">
                            <button class="clear-btn" id="clearBtn" title="Clear Chat">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                </svg>
                            </button>
                            <button class="expand-btn" id="expandBtn" title="Expand">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                                </svg>
                            </button>
                            <button class="close-btn" id="closeBtn" title="Close">&times;</button>
                        </div>
                    </div>

                    <!-- Messages -->
                    <div class="chat-messages" id="chatMessages">
                        <div class="message bot">
                            <div class="ai-response">
                                <div class="response-section content-section">
                                    <div class="content-text">
                                        Hi! I'm your AI assistant. How can I help you today?
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Input -->
                    <div class="chat-input">
                        <div class="input-container">
                            <textarea 
                                id="messageInput" 
                                placeholder="Type your message..."
                                rows="1"
                            ></textarea>
                            <button class="send-btn" id="sendBtn">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(widgetContainer);
        return widgetContainer;
    }
    
    // Widget functionality with optimized streaming
    function initializeWidget() {
        const chatBubble = document.getElementById('chatBubble');
        const chatWindow = document.getElementById('chatWindow');
        const closeBtn = document.getElementById('closeBtn');
        const expandBtn = document.getElementById('expandBtn');
        const chatMessages = document.getElementById('chatMessages');
        const messageInput = document.getElementById('messageInput');
        const sendBtn = document.getElementById('sendBtn');
        
        let isOpen = false;
        let isLoading = false;
        let isExpanded = false;
        let messages = [];
        let currentSessionId = generateSessionId(); // Conversation-level session ID
        
        // Toggle chat
        function toggleChat() {
            if (isOpen) {
                closeChat();
            } else {
                openChat();
            }
        }
        
        function openChat() {
            isOpen = true;
            chatBubble.classList.add('active');
            chatWindow.classList.add('active');
            messageInput.focus();
        }
        
        function closeChat() {
            isOpen = false;
            chatBubble.classList.remove('active');
            chatWindow.classList.remove('active');
        }
        
        function toggleExpand() {
            isExpanded = !isExpanded;
            if (isExpanded) {
                chatWindow.classList.add('expanded');
            } else {
                chatWindow.classList.remove('expanded');
            }
        }
        
        // Generate session ID
        function generateSessionId() {
            return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
        }
        
        // Reliable markdown parsing with Marked.js - fixed table rendering
        function parseMarkdown(text) {
            if (!text) return '';
            
            try {
                // Wait for marked.js to be available
                if (typeof marked === 'undefined') {
                    console.warn('Marked.js not loaded yet, falling back to simple parsing');
                    return text.replace(/\n/g, '<br>');
                }
                
                // Use marked with clean configuration - no custom renderer
                let html = marked.parse(text, {
                    breaks: true,        // Handle line breaks properly
                    gfm: true,          // GitHub Flavored Markdown (tables!)
                    sanitize: false,    // We'll handle sanitization elsewhere if needed
                    smartypants: false  // Don't convert quotes/dashes
                });
                
                // Add our CSS class to tables via post-processing
                html = html.replace(/<table>/g, '<table class="markdown-table">');
                
                return html;
                
            } catch (error) {
                console.error('Marked.js parsing error:', error);
                // Fallback to simple text with line breaks
                return text.replace(/\n/g, '<br>');
            }
        }
        
        
        // Add user message
        function addUserMessage(content) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message user';
            
            const bubbleDiv = document.createElement('div');
            bubbleDiv.className = 'user-message-bubble';
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'user-message-content';
            contentDiv.textContent = content;
            
            bubbleDiv.appendChild(contentDiv);
            messageDiv.appendChild(bubbleDiv);
            chatMessages.appendChild(messageDiv);
            scrollToBottom();
        }
        
        // Add AI response with streaming support
        function addAIResponse() {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message bot';
            
            const aiResponseDiv = document.createElement('div');
            aiResponseDiv.className = 'ai-response';
            
            messageDiv.appendChild(aiResponseDiv);
            chatMessages.appendChild(messageDiv);
            scrollToBottom();
            
            return { messageDiv, aiResponseDiv };
        }
        
        // Synchronized streaming with content coordination
        let activeStreamingTimeouts = [];
        let activeStreamingElements = []; // Track elements being streamed and their full text
        let streamingCoordinator = {
            reasoningActive: false,
            bufferedContent: null,
            bufferedSources: null,
            waitingForReasoning: false,
            currentAiResponseDiv: null,
            fullReasoningData: [], // Store complete reasoning data for full population
            streamingStopped: false // Flag to immediately stop word-by-word streaming
        };
        
        
        function clearActiveStreaming() {
            activeStreamingTimeouts.forEach(timeout => clearTimeout(timeout));
            activeStreamingTimeouts = [];
            activeStreamingElements = [];
        }
        
        // Complete any active reasoning streaming immediately (don't leave it mid-way)
        function completeActiveReasoningStreaming() {
            // IMMEDIATELY stop all word-by-word streaming
            streamingCoordinator.streamingStopped = true;
            console.log('🛑 Streaming stopped flag set - word-by-word streaming will halt');
            
            // If we have the current AI response div, populate it with complete reasoning data
            if (streamingCoordinator.currentAiResponseDiv && streamingCoordinator.fullReasoningData.length > 0) {
                const reasoningContentInner = streamingCoordinator.currentAiResponseDiv.querySelector('.reasoning-content-inner');
                if (reasoningContentInner) {
                    // Build complete reasoning HTML from full data
                    const fullReasoningHTML = streamingCoordinator.fullReasoningData.map(step => 
                        `<strong>${step.title}</strong><br>${step.thought || step.reasoning || ''}`
                    ).join('<br><br>');
                    
                    // Set the complete reasoning content immediately
                    reasoningContentInner.innerHTML = fullReasoningHTML;
                    console.log('✅ Reasoning section populated with complete data');
                }
            } else {
                // Fallback: Complete all active streaming elements immediately
                activeStreamingElements.forEach(({ element, fullText }) => {
                    if (element && fullText) {
                        element.innerHTML = fullText;
                    }
                });
            }
            
            // Clear timeouts and reset tracking
            clearActiveStreaming();
            streamingCoordinator.reasoningActive = false;
        }
        
        // Auto-close reasoning section with smooth animation
        function autoCloseReasoningSection(aiResponseDiv) {
            const reasoningToggle = aiResponseDiv.querySelector('.reasoning-toggle');
            const reasoningContent = aiResponseDiv.querySelector('.reasoning-content');
            
            if (reasoningToggle && reasoningContent && reasoningToggle.classList.contains('expanded')) {
                console.log('🎯 Auto-closing reasoning section after completion');
                
                // Add smooth transition delay for better UX
                setTimeout(() => {
                    reasoningToggle.classList.remove('expanded');
                    reasoningContent.classList.remove('expanded');
                    
                    // Smooth scroll to content after reasoning closes
                    setTimeout(() => {
                        smoothScrollToContent(aiResponseDiv);
                    }, 100); // Wait for collapse animation
                    
                }, 200); // Wait 200ms after reasoning completes
            }
        }
        
        // Smooth scroll to show content after reasoning section closes
        function smoothScrollToContent(aiResponseDiv) {
            const contentSection = aiResponseDiv.querySelector('.content-section');
            if (contentSection) {
                console.log('📜 Smooth scrolling to content');
                contentSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start',
                    inline: 'nearest'
                });
            } else {
                // Fallback to regular scroll to bottom
                scrollToBottom();
            }
        }
        
        function streamTextWordByWord(element, fullText, onComplete) {
            const words = fullText.split(' ');
            let currentIndex = 0;
            element.innerHTML = '';
            
            // Mark reasoning as active
            streamingCoordinator.reasoningActive = true;
            
            // Track this element for completion
            activeStreamingElements.push({ element, fullText });
            
            function addNextWord() {
                // 🛑 CHECK IF STREAMING WAS STOPPED (content arrived)
                if (streamingCoordinator.streamingStopped) {
                    console.log('🛑 Word-by-word streaming stopped mid-way - content arrived');
                    // Don't continue streaming - the complete function will handle full display
                    return;
                }
                
                if (currentIndex < words.length) {
                    const currentText = words.slice(0, currentIndex + 1).join(' ');
                    element.innerHTML = currentText;
                    currentIndex++;
                    
                    // Random delay between 80-120ms for natural feel
                    const delay = 80 + Math.random() * 40;
                    const timeout = setTimeout(addNextWord, delay);
                    activeStreamingTimeouts.push(timeout);
                } else {
                    // Complete text display and mark reasoning as complete
                    element.innerHTML = fullText;
                    streamingCoordinator.reasoningActive = false;
                    
                    // Release buffered content after reasoning completes
                    if (streamingCoordinator.waitingForReasoning && streamingCoordinator.currentAiResponseDiv) {
                        releaseBufferedContent();
                    }
                    
                    // Note: Don't auto-close reasoning section here - it should only close when content starts streaming
                    
                    if (onComplete) onComplete();
                }
            }
            
            addNextWord();
        }
        
        // Buffered content release system
        function releaseBufferedContent() {
            if (!streamingCoordinator.currentAiResponseDiv || !streamingCoordinator.waitingForReasoning) {
                return;
            }
            
            console.log('Releasing buffered content after reasoning completion');
            
            // Use updateContentOnly to properly handle the transition from reasoning to content
            updateContentOnly(streamingCoordinator.currentAiResponseDiv, streamingCoordinator.bufferedContent);
            
            // Add sources if available
            if (streamingCoordinator.bufferedSources && streamingCoordinator.bufferedSources.length > 0) {
                addSourcesOnly(streamingCoordinator.currentAiResponseDiv, streamingCoordinator.bufferedSources);
            }
            
            // Reset coordination state
            streamingCoordinator.bufferedContent = null;
            streamingCoordinator.bufferedSources = null;
            streamingCoordinator.waitingForReasoning = false;
            streamingCoordinator.currentAiResponseDiv = null;
        }
        
        // Append only new reasoning step - no rebuilding
        function appendNewReasoningStep(aiResponseDiv, newStep, isFirstStep) {
            let reasoningContainer = aiResponseDiv.querySelector('.reasoning-container');
            
            // Create reasoning container if it's the first step
            if (!reasoningContainer && isFirstStep) {
                reasoningContainer = document.createElement('div');
                reasoningContainer.className = 'reasoning-container';
                
                const reasoningToggle = document.createElement('div');
                reasoningToggle.className = 'reasoning-toggle expanded'; // Auto-expand for new reasoning
                reasoningToggle.innerHTML = `
                    <h4>Thinking...</h4>
                    <svg class="chevron" viewBox="0 0 24 24">
                        <path d="M7 10l5 5 5-5z"/>
                    </svg>
                `;
                
                const reasoningContent = document.createElement('div');
                reasoningContent.className = 'reasoning-content expanded'; // Auto-expand
                
                const reasoningContentInner = document.createElement('div');
                reasoningContentInner.className = 'reasoning-content-inner';
                
                // Manual toggle functionality
                reasoningToggle.addEventListener('click', () => {
                    const isExpanded = reasoningToggle.classList.contains('expanded');
                    if (isExpanded) {
                        reasoningToggle.classList.remove('expanded');
                        reasoningContent.classList.remove('expanded');
                    } else {
                        reasoningToggle.classList.add('expanded');
                        reasoningContent.classList.add('expanded');
                    }
                });
                
                reasoningContent.appendChild(reasoningContentInner);
                reasoningContainer.appendChild(reasoningToggle);
                reasoningContainer.appendChild(reasoningContent);
                aiResponseDiv.appendChild(reasoningContainer);
            }
            
            // Set current AI response div for auto-close functionality
            streamingCoordinator.currentAiResponseDiv = aiResponseDiv;
            
            // Get reasoning content inner div
            const reasoningContentInner = reasoningContainer?.querySelector('.reasoning-content-inner');
            if (reasoningContentInner) {
                // Create new step element
                const stepElement = document.createElement('div');
                stepElement.className = 'reasoning-step';
                stepElement.style.marginBottom = '16px';
                
                const stepText = `<strong>${newStep.title}</strong><br>${newStep.thought || newStep.reasoning || ''}`;
                
                // Add separator if not first step
                if (!isFirstStep) {
                    stepElement.innerHTML = '<br><br>' + stepText;
                } else {
                    stepElement.innerHTML = stepText;
                }
                
                // Stream only the new step
                streamTextWordByWord(stepElement, stepElement.innerHTML, () => {
                    console.log(`New reasoning step streamed: ${newStep.title}`);
                });
                
                reasoningContentInner.appendChild(stepElement);
                scrollToBottom();
            }
        }
        
        // Update only content - don't rebuild reasoning
        function updateContentOnly(aiResponseDiv, content) {
            // Check if content section already exists
            let contentSection = aiResponseDiv.querySelector('.content-section');
            
            if (contentSection) {
                // Update existing content
                const contentText = contentSection.querySelector('.content-text');
                if (contentText) {
                    contentText.innerHTML = parseMarkdown(content);
                }
            } else {
                // 🎯 CONTENT IS NOW STARTING TO STREAM - TIME FOR "THINKING COMPLETE"!
                console.log('🎯 Content starting to stream - completing reasoning and closing reasoning!');
                
                // COMPLETE any active reasoning word-by-word streaming immediately (don't leave it mid-way)
                completeActiveReasoningStreaming();
                
                // Mark reasoning as complete when content starts streaming
                streamingCoordinator.reasoningActive = false;
                
                // Update reasoning header to show completion
                const reasoningToggle = aiResponseDiv.querySelector('.reasoning-toggle h4');
                if (reasoningToggle) {
                    reasoningToggle.textContent = 'Thinking Complete';
                }
                
                // IMMEDIATELY close reasoning section - don't wait for delays
                const reasoningToggleElement = aiResponseDiv.querySelector('.reasoning-toggle');
                const reasoningContent = aiResponseDiv.querySelector('.reasoning-content');
                if (reasoningToggleElement && reasoningContent) {
                    reasoningToggleElement.classList.remove('expanded');
                    reasoningContent.classList.remove('expanded');
                }
                
                // Create new content section and append after reasoning (if exists)
                const contentDiv = document.createElement('div');
                contentDiv.className = 'response-section content-section';
                contentDiv.innerHTML = `
                    <div class="content-text">
                        ${parseMarkdown(content)}
                    </div>
                `;
                aiResponseDiv.appendChild(contentDiv);
            }
            
            scrollToBottom();
        }
        
        // Add only sources - don't rebuild reasoning
        function addSourcesOnly(aiResponseDiv, sources) {
            if (!sources || sources.length === 0) return;
            
            // Check if sources section already exists
            let sourcesContainer = aiResponseDiv.querySelector('.sources-container');
            
            if (!sourcesContainer) {
                // Create new sources section
                sourcesContainer = document.createElement('div');
                sourcesContainer.className = 'sources-container';
                
                const sourcesToggle = document.createElement('div');
                sourcesToggle.className = 'sources-toggle';
                sourcesToggle.innerHTML = `
                    <h4>Sources</h4>
                    <svg class="chevron" viewBox="0 0 24 24">
                        <path d="M7 10l5 5 5-5z"/>
                    </svg>
                `;
                
                const sourcesContent = document.createElement('div');
                sourcesContent.className = 'sources-content';
                const sourcesHtml = sources.map(source => 
                    `<a href="${source.url}" target="_blank" class="source-link">${source.url}</a>`
                ).join('');
                sourcesContent.innerHTML = `
                    <div class="sources-content-inner">
                        ${sourcesHtml}
                    </div>
                `;
                
                sourcesToggle.addEventListener('click', () => {
                    const isExpanded = sourcesToggle.classList.contains('expanded');
                    if (isExpanded) {
                        sourcesToggle.classList.remove('expanded');
                        sourcesContent.classList.remove('expanded');
                    } else {
                        sourcesToggle.classList.add('expanded');
                        sourcesContent.classList.add('expanded');
                    }
                });
                
                sourcesContainer.appendChild(sourcesToggle);
                sourcesContainer.appendChild(sourcesContent);
                aiResponseDiv.appendChild(sourcesContainer);
            }
            
            scrollToBottom();
        }
        
        // Direct update without buffering (for final release)
        function updateAIResponseDirectly(aiResponseDiv, streamData) {
            // Don't clear - just add content section to existing reasoning
            
            // Content section (full width) - ONLY show if reasoning is not actively streaming
            if (streamData.content && !streamingCoordinator.reasoningActive) {
                const contentDiv = document.createElement('div');
                contentDiv.className = 'response-section content-section';
                contentDiv.innerHTML = `
                    <div class="content-text">
                        ${parseMarkdown(streamData.content)}
                    </div>
                `;
                aiResponseDiv.appendChild(contentDiv);
            }
            
            // Sources section (collapsible dropdown)
            if (streamData.sources && streamData.sources.length > 0) {
                const sourcesContainer = document.createElement('div');
                sourcesContainer.className = 'sources-container';
                
                const sourcesToggle = document.createElement('div');
                sourcesToggle.className = 'sources-toggle';
                sourcesToggle.innerHTML = `
                    <h4>Sources</h4>
                    <svg class="chevron" viewBox="0 0 24 24">
                        <path d="M7 10l5 5 5-5z"/>
                    </svg>
                `;
                
                const sourcesContent = document.createElement('div');
                sourcesContent.className = 'sources-content';
                const sourcesHtml = streamData.sources.map(source => 
                    `<a href="${source.url}" target="_blank" class="source-link">${source.url}</a>`
                ).join('');
                sourcesContent.innerHTML = `
                    <div class="sources-content-inner">
                        ${sourcesHtml}
                    </div>
                `;
                
                sourcesToggle.addEventListener('click', () => {
                    const isExpanded = sourcesToggle.classList.contains('expanded');
                    if (isExpanded) {
                        sourcesToggle.classList.remove('expanded');
                        sourcesContent.classList.remove('expanded');
                    } else {
                        sourcesToggle.classList.add('expanded');
                        sourcesContent.classList.add('expanded');
                    }
                });
                
                sourcesContainer.appendChild(sourcesToggle);
                sourcesContainer.appendChild(sourcesContent);
                aiResponseDiv.appendChild(sourcesContainer);
            }
            
            scrollToBottom();
        }

        // Update AI response sections with streaming auto-reasoning behavior
        function updateAIResponse(aiResponseDiv, streamData) {
            aiResponseDiv.innerHTML = '';
            
            // Reasoning section (collapsible dropdown with streaming)
            if (streamData.reasoning && streamData.reasoning.length > 0) {
                const reasoningContainer = document.createElement('div');
                reasoningContainer.className = 'reasoning-container';
                
                const reasoningToggle = document.createElement('div');
                reasoningToggle.className = 'reasoning-toggle';
                
                // Auto-behavior: Auto-expand during reasoning streaming, auto-collapse when done
                const shouldAutoExpand = streamData.isStreaming && streamData.reasoning.length > 0;
                const shouldAutoCollapse = !streamData.isStreaming && streamData.content;
                
                if (shouldAutoExpand) {
                    reasoningToggle.classList.add('expanded');
                } else if (shouldAutoCollapse) {
                    reasoningToggle.classList.remove('expanded');
                }
                
                reasoningToggle.innerHTML = `
                    <h4>Reasoning ${streamData.isStreaming ? '(Thinking...)' : ''}</h4>
                    <svg class="chevron" viewBox="0 0 24 24">
                        <path d="M7 10l5 5 5-5z"/>
                    </svg>
                `;
                
                const reasoningContent = document.createElement('div');
                reasoningContent.className = 'reasoning-content';
                
                // Auto-expand/collapse content based on streaming state
                if (shouldAutoExpand) {
                    reasoningContent.classList.add('expanded');
                } else if (shouldAutoCollapse) {
                    reasoningContent.classList.remove('expanded');
                }
                
                const reasoningContentInner = document.createElement('div');
                reasoningContentInner.className = 'reasoning-content-inner';
                
                // Streaming text processing
                const fullReasoningText = streamData.reasoning.map(step => 
                    `<strong>${step.title}</strong><br>${step.thought || step.reasoning || ''}`
                ).join('<br><br>');
                
                // If we're streaming reasoning and it's new content, do streaming
                const reasoningKey = `reasoning_${streamData.reasoning.length}_${streamData.reasoning.map(s => s.title).join('_')}`;
                
                if (streamData.isStreaming && !reasoningContentInner.dataset.streamingKey) {
                    reasoningContentInner.dataset.streamingKey = reasoningKey;
                    
                    // Start streaming
                    clearActiveStreaming(); // Clear any previous streaming
                    streamTextWordByWord(
                        reasoningContentInner, 
                        fullReasoningText,
                        () => {
                            // Streaming complete callback
                            console.log('Reasoning streaming complete');
                        }
                    );
                } else {
                    // Not streaming or already streamed - show complete text
                    reasoningContentInner.innerHTML = fullReasoningText;
                }
                
                reasoningContent.appendChild(reasoningContentInner);
                
                // Manual toggle still works
                reasoningToggle.addEventListener('click', () => {
                    const isExpanded = reasoningToggle.classList.contains('expanded');
                    if (isExpanded) {
                        reasoningToggle.classList.remove('expanded');
                        reasoningContent.classList.remove('expanded');
                    } else {
                        reasoningToggle.classList.add('expanded');
                        reasoningContent.classList.add('expanded');
                    }
                });
                
                reasoningContainer.appendChild(reasoningToggle);
                reasoningContainer.appendChild(reasoningContent);
                aiResponseDiv.appendChild(reasoningContainer);
            }
            
            // Content section (full width)
            if (streamData.content) {
                const contentDiv = document.createElement('div');
                contentDiv.className = 'response-section content-section';
                contentDiv.innerHTML = `
                    <div class="content-text">
                        ${parseMarkdown(streamData.content)}
                    </div>
                `;
                aiResponseDiv.appendChild(contentDiv);
            }
            
            // Sources section (collapsible dropdown)
            if (streamData.sources && streamData.sources.length > 0) {
                const sourcesContainer = document.createElement('div');
                sourcesContainer.className = 'sources-container';
                
                const sourcesToggle = document.createElement('div');
                sourcesToggle.className = 'sources-toggle';
                sourcesToggle.innerHTML = `
                    <h4>Sources</h4>
                    <svg class="chevron" viewBox="0 0 24 24">
                        <path d="M7 10l5 5 5-5z"/>
                    </svg>
                `;
                
                const sourcesContent = document.createElement('div');
                sourcesContent.className = 'sources-content';
                const sourcesHtml = streamData.sources.map(source => 
                    `<a href="${source.url}" target="_blank" class="source-link">${source.url}</a>`
                ).join('');
                sourcesContent.innerHTML = `
                    <div class="sources-content-inner">
                        ${sourcesHtml}
                    </div>
                `;
                
                sourcesToggle.addEventListener('click', () => {
                    const isExpanded = sourcesToggle.classList.contains('expanded');
                    if (isExpanded) {
                        sourcesToggle.classList.remove('expanded');
                        sourcesContent.classList.remove('expanded');
                    } else {
                        sourcesToggle.classList.add('expanded');
                        sourcesContent.classList.add('expanded');
                    }
                });
                
                sourcesContainer.appendChild(sourcesToggle);
                sourcesContainer.appendChild(sourcesContent);
                aiResponseDiv.appendChild(sourcesContainer);
            }
            
            scrollToBottom();
        }
        
        // Show loading
        function showLoading() {
            isLoading = true;
            sendBtn.disabled = true;
            
            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'message bot';
            loadingDiv.id = 'loadingMessage';
            loadingDiv.innerHTML = `
                <div class="loading">
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                </div>
            `;
            
            chatMessages.appendChild(loadingDiv);
            scrollToBottom();
        }
        
        function hideLoading() {
            isLoading = false;
            sendBtn.disabled = false;
            
            const loadingMessage = document.getElementById('loadingMessage');
            if (loadingMessage) {
                loadingMessage.remove();
            }
        }
        
        // Optimized message sending with backend streaming and smooth loader
        async function sendMessage() {
            const message = messageInput.value.trim();
            if (!message || isLoading) return;
            
            // Add user message
            addUserMessage(message);
            messages.push({ role: 'user', content: message });
            messageInput.value = '';
            messageInput.style.height = 'auto';
            
            // Reset streaming coordinator for new message
            streamingCoordinator.fullReasoningData = [];
            streamingCoordinator.reasoningActive = false;
            streamingCoordinator.bufferedContent = null;
            streamingCoordinator.bufferedSources = null;
            streamingCoordinator.waitingForReasoning = false;
            streamingCoordinator.currentAiResponseDiv = null;
            streamingCoordinator.streamingStopped = false; // Reset stop flag for new message
            clearActiveStreaming();
            
            // Show loading and track first content arrival
            showLoading();
            console.log('Loader activated for smooth transition');
            
            // Prepare AI response container
            let aiResponseContainer = null;
            let loaderHidden = false; // Track loader state for smooth transition
            let streamData = {
                reasoning: [],
                content: '',
                sources: [],
                isStreaming: true
            };
            
            try {
                // Use proxyUrl if provided, otherwise use direct apiUrl
                const endpoint = config.proxyUrl || config.apiUrl;
                console.log(`Using endpoint: ${endpoint} (${config.proxyUrl ? 'proxy' : 'direct'})`);
                
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        urls: config.urls,
                        query: message,
                        session_id: currentSessionId,
                        company_name: config.companyName
                    })
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                // Don't hide loader yet - wait for first content for smooth transition
                console.log('Connection established, keeping loader alive for seamless transition');
                const responseContainer = addAIResponse();
                aiResponseContainer = responseContainer.aiResponseDiv;
                
                //  ULTRA-SIMPLE STREAM CONSUMPTION!
                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    
                    const lines = decoder.decode(value).split('\n');
                    
                    for (const line of lines) {
                        // 🐛 DEBUG: Log every line we process
                        if (line.trim()) {
                            console.log('🔍 Processing line:', line.substring(0, 150) + (line.length > 150 ? '...' : ''));
                        }
                        
                        if (line.startsWith('data: ')) {
                            try {
                                const chunk = JSON.parse(line.slice(6));
                                
                                // 🐛 DEBUG: Log every chunk type we receive
                                console.log('📦 Received chunk:', chunk.type, chunk.step?.title || '');
                                
                                // 🎯 SYNCHRONIZED CHUNK PROCESSING WITH BUFFERING - NO DUPLICATION!
                                switch (chunk.type) {
                                    case 'content':
                                        // Hide loader on first content arrival for smooth transition
                                        if (!loaderHidden) {
                                            hideLoading();
                                            loaderHidden = true;
                                            console.log('Loader smoothly transitioned to content');
                                        }
                                        
                                        // 🗑️ REMOVE CRAWLING LOADER when content starts
                                        if (aiResponseContainer) {
                                            const crawlingLoader = aiResponseContainer.querySelector('.crawling-loader');
                                            if (crawlingLoader) {
                                                console.log('🗑️ Removing crawling loader - content phase started');
                                                crawlingLoader.remove();
                                            }
                                        }
                                        
                                        streamData.content = chunk.full_content || chunk.text;
                                        streamData.isStreaming = true;
                                        
                                        // Content arrived - prepare for display
                                        console.log('🎯 Content arrived - preparing for display');
                                        
                                        // 🎯 IF REASONING IS STILL STREAMING, ONLY BUFFER - DON'T DISPLAY!
                                        if (streamingCoordinator.reasoningActive) {
                                            console.log('🎯 Buffering content - reasoning still streaming!');
                                            streamingCoordinator.bufferedContent = streamData.content;
                                            streamingCoordinator.waitingForReasoning = true;
                                            streamingCoordinator.currentAiResponseDiv = aiResponseContainer;
                                            // Don't call updateAIResponse here - only buffer!
                                        } else {
                                            // 🚀 ONLY UPDATE CONTENT - DON'T REBUILD REASONING!
                                            updateContentOnly(aiResponseContainer, streamData.content);
                                        }
                                        break;
                                        
                                    case 'reasoning':
                                        // 🐛 DEBUG: Detailed reasoning step logging
                                        console.log('🧠 REASONING CHUNK RECEIVED:', {
                                            hasStep: !!chunk.step,
                                            stepTitle: chunk.step?.title,
                                            stepNumber: chunk.step_number,
                                            isNew: chunk.is_new,
                                            currentReasoningCount: streamData.reasoning.length
                                        });
                                        
                                        if (chunk.step) {
                                            // Hide loader on first reasoning step arrival for smooth transition
                                            if (!loaderHidden) {
                                                hideLoading();
                                                loaderHidden = true;
                                                console.log('Loader smoothly transitioned to reasoning');
                                            }
                                            
                                            // 🗑️ REMOVE CRAWLING LOADER when reasoning starts
                                            if (aiResponseContainer) {
                                                const crawlingLoader = aiResponseContainer.querySelector('.crawling-loader');
                                                if (crawlingLoader) {
                                                    console.log('🗑️ Removing crawling loader - reasoning phase started');
                                                    crawlingLoader.remove();
                                                }
                                            }
                                            
                                            streamData.reasoning.push(chunk.step);
                                            console.log(`✅ Added reasoning step: ${chunk.step.title} (Total: ${streamData.reasoning.length})`);
                                            
                                            // STORE COMPLETE REASONING DATA for full population when content arrives
                                            streamingCoordinator.fullReasoningData.push(chunk.step);
                                            console.log(`📚 Stored reasoning step for completion: ${chunk.step.title} (Total stored: ${streamingCoordinator.fullReasoningData.length})`);
                                            
                                            // Stream only the new step - don't rebuild everything
                                            try {
                                                appendNewReasoningStep(aiResponseContainer, chunk.step, streamData.reasoning.length === 1);
                                                console.log(`✅ Successfully processed reasoning step: ${chunk.step.title}`);
                                            } catch (error) {
                                                console.error('❌ Error processing reasoning step:', error, chunk.step);
                                            }
                                        } else {
                                            console.warn('⚠️ Reasoning chunk missing step data:', chunk);
                                        }
                                        break;
                                        
                                    case 'crawling':
                                        // Show crawling status with loader
                                        console.log(`🔍 ${chunk.message}`, chunk.urls);
                                        
                                        // Hide main loader and show crawling loader
                                        if (!loaderHidden) {
                                            hideLoading();
                                            loaderHidden = true;
                                            console.log('Loader smoothly transitioned to crawling');
                                        }
                                        
                                        // Add crawling loader to the response
                                        if (aiResponseContainer) {
                                            let crawlingLoader = aiResponseContainer.querySelector('.crawling-loader');
                                            if (!crawlingLoader) {
                                                crawlingLoader = document.createElement('div');
                                                crawlingLoader.className = 'crawling-loader';
                                                crawlingLoader.innerHTML = `
                                                    <div class="crawling-status">
                                                        <div class="loading">
                                                            <div class="loading-dot"></div>
                                                            <div class="loading-dot"></div>
                                                            <div class="loading-dot"></div>
                                                        </div>
                                                        <div class="crawling-text">Analyzing content...</div>
                                                    </div>
                                                `;
                                                aiResponseContainer.appendChild(crawlingLoader);
                                                scrollToBottom();
                                            }
                                        }
                                        break;
                                        
                                    case 'completion':
                                        // 🗑️ REMOVE CRAWLING LOADER when completion occurs (fallback)
                                        if (aiResponseContainer) {
                                            const crawlingLoader = aiResponseContainer.querySelector('.crawling-loader');
                                            if (crawlingLoader) {
                                                console.log('🗑️ Removing crawling loader - completion phase (fallback)');
                                                crawlingLoader.remove();
                                            }
                                        }
                                        
                                        streamData.content = chunk.final_content || streamData.content;
                                        streamData.sources = chunk.sources || [];
                                        streamData.isStreaming = false;
                                        
                                        // 🎯 IF REASONING IS STILL STREAMING, ONLY BUFFER - DON'T DISPLAY!
                                        if (streamingCoordinator.reasoningActive) {
                                            console.log('🎯 Buffering completion - reasoning still streaming!');
                                            streamingCoordinator.bufferedContent = streamData.content;
                                            streamingCoordinator.bufferedSources = streamData.sources;
                                            streamingCoordinator.waitingForReasoning = true;
                                            streamingCoordinator.currentAiResponseDiv = aiResponseContainer;
                                            // Don't call updateAIResponse here - only buffer!
                                        } else {
                                            // 🚀 ONLY UPDATE CONTENT + SOURCES - DON'T REBUILD REASONING!
                                            updateContentOnly(aiResponseContainer, streamData.content);
                                            addSourcesOnly(aiResponseContainer, streamData.sources);
                                        }
                                        break;
                                        
                                    case 'error':
                                        throw new Error(chunk.message);
                                }
                                
                            } catch (e) {
                                console.error('Chunk processing error:', e);
                            }
                        }
                    }
                }
                
            } catch (err) {
                hideLoading();
                console.error('Stream error:', err);
                
                // Show error message
                if (!aiResponseContainer) {
                    const responseContainer = addAIResponse();
                    aiResponseContainer = responseContainer.aiResponseDiv;
                }
                
                const errorData = {
                    reasoning: [],
                    content: 'Sorry, I encountered an error. Please try again.',
                    sources: [],
                    isStreaming: false
                };
                updateAIResponse(aiResponseContainer, errorData);
            }
        }
        
        function scrollToBottom() {
            setTimeout(() => {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 100);
        }
        
        // 🗑️ Clear chat functionality
        function clearChat() {
            // Clear messages array
            messages = [];
            
            // Generate new session ID for fresh conversation
            currentSessionId = generateSessionId();
            
            // Clear all messages from UI
            chatMessages.innerHTML = '';
            
            // Add welcome message back
            const welcomeMessageDiv = document.createElement('div');
            welcomeMessageDiv.className = 'message bot';
            welcomeMessageDiv.innerHTML = `
                <div class="ai-response">
                    <div class="response-section content-section">
                        <div class="content-text">
                            Hi! I'm your AI assistant. How can I help you today?
                        </div>
                    </div>
                </div>
            `;
            chatMessages.appendChild(welcomeMessageDiv);
            scrollToBottom();
        }
        
        // Event listeners
        chatBubble.addEventListener('click', toggleChat);
        closeBtn.addEventListener('click', closeChat);
        expandBtn.addEventListener('click', toggleExpand);
        document.getElementById('clearBtn').addEventListener('click', clearChat);
        sendBtn.addEventListener('click', sendMessage);
        
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
        
        // Auto-resize textarea
        messageInput.addEventListener('input', () => {
            messageInput.style.height = 'auto';
            messageInput.style.height = Math.min(messageInput.scrollHeight, 100) + 'px';
        });
        
        // Auto-open if configured
        if (config.autoOpen) {
            setTimeout(openChat, 1000);
        }
    }
    
    // Public API
    window.ChatWidget = {
        init: async function(userConfig = {}) {
            if (isInitialized) {
                console.warn('Chat widget is already initialized');
                return;
            }
            
            // Merge configuration
            config = { ...defaultConfig, ...userConfig };
            
            // Load Marked.js for professional markdown parsing
            console.log('Loading Marked.js for enhanced markdown support...');
            try {
                await loadMarkedJS();
                console.log('Marked.js loaded successfully');
            } catch (error) {
                console.warn('Marked.js failed to load, using fallback parsing:', error);
            }
            
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    createWidget();
                    initializeWidget();
                    isInitialized = true;
                    console.log('Chat widget initialized with Marked.js support');
                });
            } else {
                createWidget();
                initializeWidget();
                isInitialized = true;
                console.log('Chat widget initialized with Marked.js support');
            }
        },
        
        open: function() {
            const button = document.getElementById('chatBubble');
            if (button) {
                button.click();
            }
        },
        
        close: function() {
            const closeBtn = document.getElementById('closeBtn');
            if (closeBtn) {
                closeBtn.click();
            }
        },
        
        configure: function(newConfig) {
            config = { ...config, ...newConfig };
        }
    };
    
})();
