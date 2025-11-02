'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export interface FAQ {
  question: string;
  answer: string;
}

interface FAQItemProps {
  faqs: FAQ[];
}

export function FAQItem({ faqs }: FAQItemProps) {
  return (
    <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
      {faqs.map((faq, idx) => (
        <AccordionItem key={idx} value={`item-${idx}`} className="border-slate-800">
          <AccordionTrigger className="text-left text-gray-100 hover:text-yellow-400">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-gray-400">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
