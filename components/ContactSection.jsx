"use client";
import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { motion } from 'framer-motion';


const ContactSection =() =>{
    return (
        <section id="contact" className="py-20" data-section="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-spiritual-gold mb-4 font-quicksand">
              Get In Touch
            </h2>
            <p className="text-lg text-spiritual-green max-w-3xl mx-auto leading-relaxed">
              We welcome your inquiries and look forward to helping you connect
              with our temple community.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="section-card">
                <h3 className="text-2xl font-bold text-spiritual-gold mb-6 font-quicksand">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-spiritual-cream p-3 rounded-full">
                      <Mail className="h-6 w-6 text-spiritual-gold map-pin-glow" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-spiritual-green">Email</h4>
                      <p className="text-spiritual-green">info@kuberjitemple.org</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-spiritual-cream p-3 rounded-full">
                      <Phone className="h-6 w-6 text-spiritual-gold map-pin-glow" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-spiritual-green">Phone</h4>
                      <p className="text-spiritual-green">+91 12345 67890</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-spiritual-cream p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-spiritual-gold map-pin-glow" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-spiritual-green">Address</h4>
                      <p className="text-spiritual-green">
                        Pandukeshwar
                        <br />
                        Joshimath, UK 246443
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-spiritual-cream p-3 rounded-full">
                      <Clock className="h-6 w-6 text-spiritual-gold map-pin-glow" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-spiritual-green">
                        Temple Hours
                      </h4>
                      <p className="text-spiritual-green text-sm">
                        Monday - Friday: 7:00 AM - 12:00 PM, 5:00 PM - 8:00 PM
                        <br />
                        Saturday: 7:00 AM - 12:00 PM, 4:00 PM - 9:00 PM
                        <br />
                        Sunday: 7:00 AM - 9:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="section-card bg-gradient-to-br from-spiritual-gold to-gold-accent p-8 text-white">
                <h4 className="text-xl font-bold mb-4 font-quicksand">
                  Ready to Make a Difference?
                </h4>
                <p className="mb-6 opacity-95 leading-relaxed">
                  Whether you're a spiritual seeker looking for guidance or someone who
                  wants to contribute to our cause, we'd love to hear from you.
                </p>
                <Button className="spiritual-button bg-white text-spiritual-gold hover:bg-spiritual-cream font-semibold">
                  Schedule a Visit
                </Button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="section-card"
            >
              <h3 className="text-2xl font-bold text-spiritual-gold mb-6 font-quicksand">
                Send us a Message
              </h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-spiritual-green mb-2">
                      First Name
                    </label>
                    <Input placeholder="Your first name" className="rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-spiritual-green mb-2">
                      Last Name
                    </label>
                    <Input placeholder="Your last name" className="rounded-xl" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-spiritual-green mb-2">
                    Email
                  </label>
                  <Input type="email" placeholder="your.email@example.com" className="rounded-xl" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-spiritual-green mb-2">
                    Phone
                  </label>
                  <Input type="tel" placeholder="+91 12345 43210" className="rounded-xl" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-spiritual-green mb-2">
                    Subject
                  </label>
                  <Input placeholder="How can we help you?" className="rounded-xl" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-spiritual-green mb-2">
                    Message
                  </label>
                  <Textarea
                    placeholder="Tell us more about your inquiry..."
                    className="min-h-[120px] rounded-xl"
                  />
                </div>
                <Button className="spiritual-button w-full bg-spiritual-gold hover:bg-gold-accent text-white font-semibold" type="submit">
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    );
}

export default ContactSection;