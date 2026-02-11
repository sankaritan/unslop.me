// Mock responses for test mode
const MOCK_RESPONSES = [
  "Hey, just wanted to circle back on this. The thing is, we need to get this done by EOD. Can you take a look and let me know what you think?",
  "So I've been thinking about this a lot, and honestly? We should probably just go with the simpler approach. Less headache, you know?",
  "Quick question - did you get a chance to review that thing I sent over? No rush, but would be great to hear your thoughts when you can.",
  "Alright, here's the deal. We've got three options and none of them are perfect, but option B seems like the least painful. What do you think?",
  "Not gonna lie, this is trickier than I thought. Maybe we should loop in Sarah? She dealt with something similar last quarter.",
  "Just a heads up - the timeline's shifted a bit. Still doable, but we might need to cut a few corners. You good with that?",
  "Okay so I tried the approach we talked about and it's... not great. Thinking we pivot to plan B. Thoughts?",
  "Real talk - this is going to take longer than expected. Better to do it right than rush it, yeah?",
];

/**
 * Simulates streaming response by yielding text character by character
 * with realistic timing delays
 */
export async function* mockStreamResponse(text: string): AsyncGenerator<string> {
  const response = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
  
  // Initial delay to simulate API response time
  await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 400));
  
  // Stream characters with variable delay
  for (let i = 0; i < response.length; i++) {
    yield response[i];
    
    // Variable delay to simulate realistic typing speed
    // Faster for letters, slower for punctuation/spaces
    const char = response[i];
    let delay = 15 + Math.random() * 25; // Base delay 15-40ms
    
    if (char === '.' || char === '?' || char === '!') {
      delay += 100 + Math.random() * 200; // Pause after sentences
    } else if (char === ',' || char === ':' || char === ';') {
      delay += 50 + Math.random() * 100; // Pause after punctuation
    } else if (char === ' ') {
      delay += 10 + Math.random() * 20; // Slight pause for spaces
    }
    
    await new Promise(resolve => setTimeout(resolve, delay));
  }
}

/**
 * Gets a random mock response (for non-streaming use)
 */
export function getMockResponse(): string {
  return MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
}
