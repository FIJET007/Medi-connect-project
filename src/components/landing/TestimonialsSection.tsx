import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    age: 72,
    image: 'https://images.pexels.com/photos/2050994/pexels-photo-2050994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    text: "MediConnect has been a lifesaver for me. I used to struggle to get to the pharmacy due to my mobility issues, but now I can get my medications delivered right to my door. The app is so easy to use, even for someone who isn't tech-savvy.",
    rating: 5,
  },
  {
    id: 2,
    name: 'Robert Miller',
    age: 68,
    image: 'https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    text: "After my surgery, it was hard to leave the house to pick up prescriptions. MediConnect made it simple to upload my prescription and get everything delivered. The customer service is excellent, and they always follow up to make sure I received my medications.",
    rating: 4,
  },
  {
    id: 3,
    name: 'Maria Garcia',
    age: 65,
    image: 'https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    text: "I take care of my husband who has Alzheimer's, and MediConnect has taken one big worry off my plate. The medication delivery is always on time, and the app updates keep me informed every step of the way. I highly recommend this service.",
    rating: 5,
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container-custom px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Patients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Read how MediConnect has helped patients simplify their medication management.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-gray-500 text-sm">{testimonial.age} years old</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5"
                    fill={i < testimonial.rating ? "#F59E0B" : "none"}
                    stroke={i < testimonial.rating ? "#F59E0B" : "#D1D5DB"}
                  />
                ))}
              </div>
              
              <p className="text-gray-700 italic">"{testimonial.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;