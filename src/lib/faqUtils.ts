// Utility function to detect and parse FAQ sections from markdown content
export interface FAQItem {
    question: string;
    answer: string;
}

export function extractFAQs(content: string): FAQItem[] {
    const faqs: FAQItem[] = [];

    // Match FAQ section with ### headings
    const faqSectionRegex = /## Frequently Asked Questions([\s\S]*?)(?=\n## |$)/i;
    const faqSectionMatch = content.match(faqSectionRegex);

    if (!faqSectionMatch) {
        return faqs;
    }

    const faqContent = faqSectionMatch[1];

    // Match individual Q&A pairs (### Question followed by answer text)
    const qaRegex = /###\s+(.+?)\n\n([\s\S]+?)(?=\n###|\n##|$)/g;
    let match;

    while ((match = qaRegex.exec(faqContent)) !== null) {
        const question = match[1].trim();
        let answer = match[2].trim();

        // Remove markdown formatting from answer for schema
        answer = answer
            .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
            .replace(/\*(.+?)\*/g, '$1')     // Remove italic
            .replace(/\n\n/g, ' ')           // Replace double newlines with space
            .replace(/\n/g, ' ')             // Replace newlines with space
            .replace(/\s+/g, ' ')            // Normalize whitespace
            .trim();

        if (question && answer) {
            faqs.push({ question, answer });
        }
    }

    return faqs;
}
