"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { MessageCircle } from "lucide-react";

export default function WhatsappFAB() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="fixed bottom-8 right-8 z-50">
            <Button
              asChild
              size="icon"
              className="h-16 w-16 rounded-full shadow-lg"
              style={{ backgroundColor: "#25D366", color: "white" }}
            >
              <Link
                href="https://wa.me/1234567890" // Replace with your WhatsApp number
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact us on WhatsApp"
              >
                <MessageCircle className="h-12 w-12 scale-150" />
              </Link>
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Contact us on WhatsApp</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
