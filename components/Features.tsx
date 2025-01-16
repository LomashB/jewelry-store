import { RefreshCcw, Shield, Truck, Award } from 'lucide-react';

export default function Features() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center">
        <div className="rounded-full bg-[#50e3c2] p-4 mb-4">
          <RefreshCcw className="w-6 h-6 " />
        </div>
        <h3 className="font-semibold text-black mb-2">15-Day Return & Exchange</h3>
        <p className="text-sm text-gray-700">(No questions asked)</p>
      </div>
      
      <div className="flex flex-col items-center text-center">
        <div className="rounded-full bg-[#50e3c2] p-4 mb-4">
          <Shield className="w-6 h-6" />
        </div>
        <h3 className="font-semibold text-black mb-2">925 Sterling Silver</h3>
        <p className="text-sm text-gray-700">(Tested and Stamped, yep!)</p>
      </div>
      
      <div className="flex flex-col items-center text-center">
        <div className="rounded-full bg-[#50e3c2] p-4 mb-4">
          <Award className="w-6 h-6" />
        </div>
        <h3 className="font-semibold text-black mb-2">Always Cadmium Free</h3>
        <p className="text-sm text-gray-700">(Cuz safety over everything)</p>
      </div>
      
      <div className="flex flex-col items-center text-center">
        <div className="rounded-full bg-[#50e3c2] p-4 mb-4">
          <Truck className="w-6 h-6" />
        </div>
        <h3 className="font-semibold text-black mb-2">Free & Insured Shipping</h3>
        <p className="text-sm text-gray-700">(Free - atleast for now ;)</p>
      </div>
    </div>
  );
}

