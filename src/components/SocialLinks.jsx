import React from 'react';
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaWhatsapp,
  FaLinkedinIn,
  FaTwitter
} from 'react-icons/fa';

export default function SocialLinks({ institutionHandle = 'eduprime' }) {
  const socialPlatforms = [
    {
      name: 'Instagram',
      url: `https://instagram.com/${institutionHandle}`,
      icon: FaInstagram,
      brandColor: 'hover:bg-[#E1306C] hover:border-[#E1306C]',
    },
    {
      name: 'Facebook',
      url: `https://facebook.com/${institutionHandle}`,
      icon: FaFacebookF,
      brandColor: 'hover:bg-[#1877F2] hover:border-[#1877F2]',
    },
    {
      name: 'YouTube',
      url: `https://youtube.com/${institutionHandle}`,
      icon: FaYoutube,
      brandColor: 'hover:bg-[#FF0000] hover:border-[#FF0000]',
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/919074827805',
      icon: FaWhatsapp,
      brandColor: 'hover:bg-[#25D366] hover:border-[#25D366]',
    },
    
  ];

  return (
    <div className="flex justify-center items-center gap-3 sm:gap-4 py-6">
      {socialPlatforms.map((platform) => {
        const IconComponent = platform.icon;
        return (
          <a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            title={platform.name}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-orange flex items-center justify-center text-gray-500 transition-all duration-300 transform hover:scale-110 hover:text-white shadow-sm ${platform.brandColor}`}
          >
            <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
        );
      })}
    </div>
  );
}
