'use client';

import AuctionCard from '@/components/AuctionCard';
import Badge from '@/components/Badge';
import Carousel from '@/components/Carousel';
import IconButton from '@/components/IconButton';
import Rating from '@/components/Rating';
import RecentBids from '@/components/RecentBids';
import Review from '@/components/Review';
// import { HeartIcon as HeartIconOutline} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import DOMPurify from 'dompurify';
import { useParams } from 'next/navigation';

const images = [
  'https://images.unsplash.com/photo-1628202926206-c63a34b1618f?auto=format&amp;fit=crop&amp;q=80&amp;w=1160',
  'https://images.unsplash.com/photo-1628202926206-c63a34b1618f?auto=format&amp;fit=crop&amp;q=80&amp;w=1160',
  'https://images.unsplash.com/photo-1628202926206-c63a34b1618f?auto=format&amp;fit=crop&amp;q=80&amp;w=1160',
  'https://images.unsplash.com/photo-1628202926206-c63a34b1618f?auto=format&amp;fit=crop&amp;q=80&amp;w=1160',
];

const description = `
    <h1>Samsung 75-inch LS03D The Frame Lifestyle Smart TV + Living Room Refresh Bundle</h1>

    <h2>Bundle Contents</h2>
    <ul>
      <li>1× Samsung 75-inch LS03D The Frame Lifestyle Smart TV</li>
      <li>
        1× Wilcott Weaves – <em>Cosmic Encounter</em>
      </li>
      <li>
        1× Joshua Steinberg – Classic Safaro Ottoman Series – <em>Ursus</em>
      </li>
    </ul>

    <p>
      <strong>Delivery Note:</strong> Items may arrive in separate packages over several days.
      Please allow up to <strong>2 weeks</strong> for delivery.
    </p>

    <hr />

    <h2>Samsung 75-inch LS03D The Frame Lifestyle Smart TV</h2>
    <p>
      This lifestyle TV helps you curate your own gallery with works of art or personal photos. It’s
      customizable and showcases expert-validated color with stunning <strong>4K resolution</strong>
      .
    </p>

    <h3>Key Features</h3>
    <ul>
      <li>
        <strong>Art Mode:</strong> Transform your QLED 4K TV into your own art exhibit with modern
        or classic art pieces, or your personal photos.
      </li>
      <li>
        <strong>Anti-Reflection Matte Display:</strong> Enjoy 100% Color Volume with virtually no
        light reflection, day or night. The Matte Display Film reduces glare for better visibility¹.
      </li>
      <li>
        <strong>Customizable Frame:</strong> Match your TV to your style with magnetic, snap-on
        bezel options².
      </li>
      <li>
        <strong>Slim-Fit Wall Mount Included:</strong> Mount The Frame flush to the wall for a
        sleek, gallery-style look³.
      </li>
      <li>
        <strong>Pantone Validated:</strong> Industry-leading color accuracy ensures realistic hues,
        tints, and skin tones.
      </li>
      <li>
        <strong>Art Streams:</strong> Stream 20 complimentary curated artworks and enjoy a free
        2-month Art Store trial⁴.
      </li>
      <li>
        <strong>Art Store:</strong> Unlimited access to 2,500+ artworks from world-famous galleries
        with subscription⁴.
      </li>
      <li>
        <strong>Motion & Brightness Sensors:</strong> Art turns on with room movement and
        auto-adjusts brightness for energy efficiency⁵.
      </li>
      <li>
        <strong>Quantum Processor 4K:</strong> Delivers sharp details, vivid color, and enhanced
        contrast.
      </li>
      <li>
        <strong>Samsung Tizen OS + SmartThings:</strong> Stream, game, work out, and control smart
        devices seamlessly⁶.
      </li>
    </ul>

    <hr />

    <h3>Specifications</h3>
    <ul>
      <li>
        <strong>Display Type:</strong> QLED
      </li>
      <li>
        <strong>Screen Size:</strong> 75 inches
      </li>
      <li>
        <strong>Resolution:</strong> 4K
      </li>
      <li>
        <strong>HDR:</strong> Yes (Quantum HDR)
      </li>
      <li>
        <strong>Refresh Rate:</strong> 120Hz
      </li>
      <li>
        <strong>Picture Processor:</strong> Quantum Processor 4K
      </li>
      <li>
        <strong>Smart Platform:</strong> Tizen
      </li>
      <li>
        <strong>Virtual Assistants:</strong> Bixby, Alexa, Google Assistant
      </li>
      <li>
        <strong>Sound Support:</strong> Dolby Atmos, Q-Symphony, Object Tracking Sound
      </li>
      <li>
        <strong>HDMI Ports:</strong> 4 (HDMI 2.1 supported)
      </li>
      <li>
        <strong>USB Ports:</strong> 2
      </li>
      <li>
        <strong>Wireless:</strong> Wi-Fi, Bluetooth
      </li>
      <li>
        <strong>VESA Mount:</strong> 400 × 400
      </li>
      <li>
        <strong>Wall-Mountable:</strong> Yes
      </li>
    </ul>

    <hr />

    <h3>What’s Included</h3>
    <ul>
      <li>Samsung 75″ Class LS03D The Frame Series QLED 4K Smart TV</li>
      <li>Simple Stand</li>
      <li>SolarCell Remote TM2361E</li>
      <li>One Connect Box</li>
      <li>Slim Fit Wall Mount</li>
      <li>Power Cable</li>
      <li>User Manual</li>
      <li>E-Manual</li>
    </ul>

    <hr />

    <h3>Footnotes</h3>
    <ol>
      <li>QLED TVs produce 100% Color Volume in the DCI-P3 color space.</li>
      <li>Bezels sold separately.</li>
      <li>Small wall gaps may occur if wall is not perfectly flat or installation is incorrect.</li>
      <li>Art Store subscription fees apply.</li>
      <li>Motion Sensor operates only in Art Mode; performance varies by lighting.</li>
      <li>Samsung Account required for smart services and streaming apps.</li>
    </ol>
  `;

const Bid = () => {
  const { id } = useParams();
  console.log(id, 'NTT');

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="group relative block overflow-hidden">
        <IconButton
          name="Wishlist"
          rounded
          className="absolute right-2 top-2 lg:right-4 lg:top-4 z-10 color"
        >
          <HeartIconSolid className="h-4 w-4 text-red-500" />
        </IconButton>

        <Carousel images={images} imageContainerClassName="h-50 lg:h-100" />

        <div className="mt-4 relative bg-white p-3 lg:p-6">
          <h1 className="text-heading font-semibold">Wireless Headphones</h1>

          <div className="mt-4 flex flex-wrap gap-4 items-center">
            <Badge text="Test" icon={<HeartIconSolid className="w-4 h-4" />} />
            <Badge text="Test" />
            <Badge text="Test" />
            <Badge text="Test" />
            <Badge text="Test" />
          </div>

          <div
            className="mt-6"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(description),
            }}
          />

          <div className="mt-6 flex items-center justify-between border-b-2 border-gray-200 pb-6 ">
            <div className="w-1/2">
              <h1 className="font-semibold text-2xl">Ratings & Reviews</h1>
              <div className="mt-2 flex items-center justify-start gap-6">
                <div className="border-r-2 border-gray-200 pr-2">
                  <h1 className="text-2xl font-semibold">5.0</h1>
                </div>
                <div className="flex flex-col gap-1 items-start">
                  <Rating score={4.57676} />
                  <h1 className="text-sm text-gray-400 font-semibold">(1 review)</h1>
                </div>
              </div>
            </div>

            <div className="w-1/2">
              <div className="flex items-center mt-2">
                <span className="w-36 text-right whitespace-nowrap text-xs font-bold text-gray-400">
                  Shipping
                </span>
                <div className="mx-4 h-2.5 w-full rounded-full bg-gray-200 ">
                  <div className="h-2.5 w-[70%] rounded-full bg-yellow-400"></div>
                </div>
              </div>
              <div className="flex items-center mt-2">
                <span className="w-36 text-right whitespace-nowrap text-xs font-bold text-gray-400">
                  Product Quality
                </span>
                <div className="mx-4 h-2.5 w-full rounded-full bg-gray-200 ">
                  <div className="h-2.5 w-[70%] rounded-full bg-yellow-400"></div>
                </div>
              </div>
              <div className="flex items-center mt-2">
                <span className="w-36 text-right whitespace-nowrap text-xs font-bold text-gray-400">
                  Packaging
                </span>
                <div className="mx-4 h-2.5 w-full rounded-full bg-gray-200 ">
                  <div className="h-2.5 w-[70%] rounded-full bg-yellow-400"></div>
                </div>
              </div>
              <div className="flex items-center mt-2">
                <span className="w-36 text-right whitespace-nowrap text-xs font-bold text-gray-400">
                  As Described
                </span>
                <div className="mx-4 h-2.5 w-full rounded-full bg-gray-200 ">
                  <div className="h-2.5 w-[70%] rounded-full bg-yellow-400"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-6">
            {[...Array(5)].map((_, idx) => (
              <Review key={idx} />
            ))}
          </div>
        </div>
      </div>
      <div className="w-3xl">
        <AuctionCard status="active" />
        <RecentBids />
      </div>
    </div>
  );
};
export default Bid;
