import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Schedulesession from "@/components/Schedulesession";
import patient from "../../../../public/patient.svg";
import Link from "next/link";
import { doctors } from "@/lib/data";

export default async function ScheduleSessionpage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(id);

  return (
    <div className="max-w-md mx-auto p-4 space-y-5 h-[100vh] bg-gradient-to-b from-[#f2eaff] to-[#fde7eb]">
      <div className="flex items-center space-x-2 text-sm font-medium">
        <Link href={"/"}>
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <span>Schedule Session</span>
      </div>

      {/* Patient Info */}
      <div>
        <p>Patient</p>
        <div className="bg-white rounded-xl p-3 shadow flex items-center gap-3">
          <Image
            src={patient}
            alt="patient"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="font-medium">Shubham Naik</p>
            <p className="text-xs text-muted-foreground">+91 9876543210</p>
          </div>
        </div>
      </div>

      {/* Practitioner Info */}
      <div>
        <p>Assign Practitioner</p>
        <div className="bg-white rounded-xl p-3 shadow flex items-center gap-3">
          <Image
            src={doctors[parseInt(id) - 1].image}
            alt="practitioner"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="font-medium">{doctors[parseInt(id) - 1].name}</p>
            <p className="text-xs text-muted-foreground">
              {doctors[parseInt(id) - 1].phone}
            </p>
          </div>
        </div>
      </div>
      <Schedulesession />
    </div>
  );
}
