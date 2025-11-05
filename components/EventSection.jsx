import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";


import { motion } from "framer-motion";
import { Timeline } from "@/components/ui/timeline";

const pos = {
  1: {
    x: 15,
    y: 15,
    z: -15,
  },
  2: {
    x: 0,
    y: 15,
    z: 0,
  },
  3: {
    x: -15,
    y: 5,
    z: 15,
  },
};
const upcomingEvents = [
  {
    id: 1,
    title: "Kuber Jayanti Celebration",
    date: "April 15, 2025",
    time: "8:00 AM - 12:00 PM",
    description:
      "Special puja and havan to celebrate the birth of Lord Kuber, followed by prasad distribution.",
  },
  {
    id: 2,
    title: "Dhanteras Special Puja",
    date: "October 31, 2025",
    time: "7:00 PM - 9:00 PM",
    description:
      "Special worship of Lord Kuber and Goddess Lakshmi on the auspicious day of Dhanteras.",
  },
  {
    id: 3,
    title: "Monthly Kuber Abhishekam",
    date: "May 1, 2025",
    time: "10:00 AM - 11:30 AM",
    description:
      "Monthly special abhishekam ritual for Lord Kuber with chanting of mantras.",
  },
];

// export const EventsSection = () => {
//   return (
//     <section
//       className="py-16 relative select-none cursor-default z-0"
//       id="events"
//     >
      

//       {/* Foreground Content */}
//       <div className="container mx-auto px-4 md:px-6 relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, ease: "easeInOut" }}
//           viewport={{ once: true }}
//           className="text-center mb-12"
//         >
//           <CalendarClock
//             size={60}
//             className="text-center mx-auto text-amber-100 my-5"
//           />
//           <h2 className="font-sanskrit text-amber-100 text-3xl md:text-4xl font-bold  mb-4">
//             Upcoming Temple Events
//           </h2>
//           <p className="font-body text-amber-100 text-lg max-w-2xl mx-auto">
//             Join us for these sacred celebrations and community gatherings. All
//             are welcome to participate and receive blessings.
//           </p>
//         </motion.div>

//         <div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {upcomingEvents.map((event) => (
//               <motion.div
//                 key={event.id}
//                 initial={{ opacity: 0, skewX: pos[event.id].x }}
//                 whileInView={{ opacity: 1, skewX: 0 }}
//                 transition={{ duration: 1, ease: "easeInOut" }}
//                 viewport={{ once: true }}
//                 className="bg-amber-100 text-primary rounded-lg shadow-md overflow-hidden border border-temple-gold/20 transition-transform hover:-translate-y-1"
//               >
//                 <div className="p-4 flex items-center justify-between">
//                   <h3 className="font-sanskrit font-bold text-lg">
//                     {event.title}
//                   </h3>
//                   <Calendar size={20} />
//                 </div>
//                 <div className="p-6">
//                   <div className="mb-4">
//                     <p className="font-body font-medium">{event.date}</p>
//                     <p className="font-body text-sm text-gray-600">
//                       {event.time}
//                     </p>
//                   </div>
//                   <p className="font-body text-gray-700 mb-4">
//                     {event.description}
//                   </p>
//                   <Button
//                     variant="outline"
//                     className="w-full border-temple-gold hover:bg-primary hover:text-amber-100"
//                   >
//                     View Details
//                   </Button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           <div className="text-center mt-10">
//             <Button
//               asChild
//               className="bg-amber-100 hover:bg-temple-gold/90 text-primary"
//             >
//               <Link href="/events">View All Events</Link>
//             </Button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

export function TimelineDemo() {
  const data = [
    {
      title: "April 15, 2025",
      content: (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="section-card bg-white/90"
          data-event="kuber-jayanti"
        >
          <div className="p-4 flex items-center justify-between border-b border-spiritual-gold/20">
            <h3 className="font-quicksand font-bold text-lg md:text-xl text-spiritual-gold">
              Kuber Jayanti Celebration
            </h3>
            <Calendar size={24} className="text-spiritual-gold" />
          </div>
          <div className="p-6">
            <div className="mb-4">
              <p className="font-semibold text-spiritual-green">8:00 AM - 12:00 PM</p>
            </div>
            <p className="text-spiritual-green mb-4 leading-relaxed">
              Special puja and havan to celebrate the birth of Lord Kuber,
              followed by prasad distribution.
            </p>
            <Button
              variant="outline"
              className="spiritual-button w-full border-2 border-spiritual-gold text-spiritual-gold hover:bg-spiritual-gold hover:text-white rounded-full font-semibold"
            >
              View Details
            </Button>
          </div>
        </motion.div>
      ),
    },
    {
      title: "October 31, 2025",
      content: (
        <motion.div
          className="section-card bg-white/90"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          data-event="dhanteras"
        >
          <div className="p-4 flex items-center justify-between border-b border-spiritual-gold/20">
            <h3 className="font-quicksand font-bold text-lg md:text-xl text-spiritual-gold">
              Dhanteras Special Puja
            </h3>
            <Calendar size={24} className="text-spiritual-gold" />
          </div>
          <div className="p-6">
            <div className="mb-4">
              <p className="font-semibold text-spiritual-green">7:00 PM - 9:00 PM</p>
            </div>
            <p className="text-spiritual-green mb-4 leading-relaxed">
              Special worship of Lord Kuber and Goddess Lakshmi on the
              auspicious day of Dhanteras.
            </p>
            <Button
              variant="outline"
              className="spiritual-button w-full border-2 border-spiritual-gold text-spiritual-gold hover:bg-spiritual-gold hover:text-white rounded-full font-semibold"
            >
              View Details
            </Button>
          </div>
        </motion.div>
      ),
    },
    {
      title: "May 1, 2025",
      content: (
        <motion.div
          className="section-card bg-white/90"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          data-event="abhishekam"
        >
          <div className="p-4 flex items-center justify-between border-b border-spiritual-gold/20">
            <h3 className="font-quicksand font-bold text-lg md:text-xl text-spiritual-gold">
              Monthly Kuber Abhishekam
            </h3>
            <Calendar size={24} className="text-spiritual-gold" />
          </div>
          <div className="p-6">
            <div className="mb-4">
              <p className="font-semibold text-spiritual-green">10:00 AM - 11:30 AM</p>
            </div>
            <p className="text-spiritual-green mb-4 leading-relaxed">
              Monthly special abhishekam ritual for Lord Kuber with chanting of
              mantras.
            </p>
            <Button
              variant="outline"
              className="spiritual-button w-full border-2 border-spiritual-gold text-spiritual-gold hover:bg-spiritual-gold hover:text-white rounded-full font-semibold"
            >
              View Details
            </Button>
          </div>
        </motion.div>
      ),
    },
  ];
  return (
      <div className="relative overflow-clip py-16 cursor-default select-none" data-section="events">
      <Timeline data={data} />
    </div> 
  );
}
