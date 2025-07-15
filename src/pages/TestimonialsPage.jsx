import React from 'react';
// import { MessageSquare as MessageSquareIcon } from 'lucide-react'; // Icon import if needed for some elements within

const TestimonialsPage = () => {
  const testimonials = [
    {
      quote: "Sarah made me feel absolutely stunning on my wedding day! Her attention to detail and calm demeanor were a blessing.",
      author: "Jessica L.",
      rating: 5,
      avatar: "https://placehold.co/100x100/E0F2F7/2196F3?text=JL"
    },
    {
      quote: "I've never felt more confident! Sarah understood exactly what I wanted for my photoshoot and delivered beyond expectations.",
      author: "Emily R.",
      rating: 5,
      avatar: "https://placehold.co/100x100/F3E5F5/9C27B0?text=ER"
    },
    {
      quote: "The makeup lesson was incredibly helpful. Sarah is a fantastic teacher and now I can recreate my favorite looks myself!",
      author: "Olivia M.",
      rating: 4,
      avatar: "https://placehold.co/100x100/FFF3E0/FF9800?text=OM"
    },
  ];

  return (
    <section id="testimonials" className="container mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold text-center text-purple-700 mb-12">What Our Clients Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border-b-4 border-purple-500 transform hover:translate-y-[-5px] transition duration-300"
          >
            <img
              src={testimonial.avatar}
              alt={testimonial.author}
              className="w-24 h-24 rounded-full object-cover mb-6 shadow-md"
            />
            <p className="text-lg italic text-gray-700 mb-4">"{testimonial.quote}"</p>
            <div className="flex text-yellow-500 mb-3">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < testimonial.rating ? 'fill-current' : 'fill-gray-300'}`}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 3.917 1.48-8.279L.001 9.306l8.332-1.151L12 .587z" />
                </svg>
              ))}
            </div>
            <p className="font-semibold text-pink-600">- {testimonial.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsPage;
