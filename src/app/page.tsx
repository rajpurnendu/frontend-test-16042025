import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { doctors } from "@/lib/data";
import { Filter, LayoutGrid } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function DoctorAccordion() {
  return (
    <div className="max-w-md mx-auto mt-3 space-y-3">
      {/* Search Bar UI */}
      <div className="sticky top-2 z-10">
        <div className="flex items-center space-x-2 mx-2">
          <div className="relative w-[100%]">
            <Input
              type="text"
              placeholder="Search"
              className="pl-4 pr-10 bg-white"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-500 right-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button className="p-2 text-gray-500 bg-white rounded-sm">
            <LayoutGrid size={18} />
          </button>
          <button className="p-2 text-gray-500 bg-white rounded-sm">
            <Filter size={18} />
          </button>
        </div>
      </div>
      {/* Accordion List */}
      <div className="overflow-y-auto h-full">
        <Accordion type="single" collapsible defaultValue="0">
          {doctors.map((doc, index) => (
            <AccordionItem
              key={doc.id}
              value={index.toString()}
              className="rounded-xl border px-4 py-2 shadow-md my-4 mx-2 bg-white"
            >
              <AccordionTrigger className="flex items-center">
                <div className="flex items-center gap-2">
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-sm">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.phone}</p>
                    {doc.expertise && (
                      <p className="text-sm font-medium text-muted-foreground">
                        {doc.expertise}
                      </p>
                    )}
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pt-4">
                <div className="grid grid-cols-2 text-sm gap-1 mb-3">
                  <div>
                    <p className="font-semibold text-sm">Expertise</p>
                    <p className="text-muted-foreground">{doc.expertise}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">Gender</p>
                    <p className="text-muted-foreground">{doc.gender}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Session mode</p>
                    <p className="text-muted-foreground">{doc.mode}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">Session Fee</p>
                    <p className="text-muted-foreground">{doc.fee}</p>
                  </div>
                </div>
                <Link href={`/schedule-session/${doc.id}`}>
                  <Button className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white">
                    Book Now
                  </Button>
                </Link>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
