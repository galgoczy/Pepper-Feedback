"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Star, Send, CheckCircle } from "lucide-react";

const scriptUrl =
  "https://script.google.com/macros/s/AKfycbxN1yWXJQj9FqWR9OzJTQFlCFEwvlVmWSzSOpjgpS7hcXBvOuIXvi4TMhVrVYF5ai_gog/exec";

export default function PepperHouseFeedback() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [location, setLocation] = useState("");
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [foodQuality, setFoodQuality] = useState(0);
  const [serviceQuality, setServiceQuality] = useState(0);
  const [pricing, setPricing] = useState(0);
  const [cleanliness, setCleanliness] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      alert("Kérjük, adjon értékelést csillagokkal!");
      return;
    }

    if (!location) {
      alert("Kérjük, válassza ki, melyik egységünket látogatta!");
      return;
    }

    setIsSubmitting(true);

    try {
      const dataToSend = {
        location,
        rating,
        feedback,
        email,
        foodQuality,
        serviceQuality,
        pricing,
        cleanliness
      };

      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend)
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error("Hiba történt:", error);
      alert("Hiba történt az elküldés során. Kérjük, próbálja újra később!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = () => {
    return (
      <div className="flex gap-2 justify-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            className="transition-transform hover:scale-110 focus:outline-none"
          >
            <Star
              size={40}
              className={`${
                star <= (hoveredRating || rating)
                  ? "fill-red-500 text-red-500"
                  : "text-gray-300"
              } transition-colors`}
            />
          </button>
        ))}
      </div>
    );
  };

  type NumberRatingProps = {
    value: number;
    onChange: (value: number) => void;
    label: string;
  };

  const NumberRating = ({ value, onChange, label }: NumberRatingProps) => {
    return (
      <div className="py-3">
        <div className="flex items-center justify-between gap-2 mb-2 sm:mb-0">
          <span className="text-gray-700 text-sm sm:text-base min-w-0">{label}</span>
        </div>
        <div className="flex gap-1.5 sm:gap-2 justify-end sm:justify-end mt-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => onChange(num)}
              className={`${
                value === num
                  ? "bg-red-500 text-white shadow-md scale-110"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              } w-12 h-12 sm:w-10 sm:h-10 rounded-lg font-semibold transition-all flex-shrink-0`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    );
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Köszönjük!</h2>
          <p className="text-gray-600 mb-6">
            Véleménye sikeresen elküldve. Nagyra értékeljük visszajelzését!
          </p>
          {email && (
            <p className="text-sm text-gray-500">
              Visszajelzésünket 72 órán belül küldjük a megadott email címre.
            </p>
          )}
          <button
            onClick={() => {
              setIsSubmitted(false);
              setRating(0);
              setLocation("");
              setFeedback("");
              setEmail("");
              setFoodQuality(0);
              setServiceQuality(0);
              setPricing(0);
              setCleanliness(0);
            }}
            className="mt-6 text-red-500 hover:text-red-600 font-semibold"
          >
            Új vélemény leadása
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
        <div className="flex justify-center mb-8">
          <Image
            src="/pepperhouse-logo-official.svg"
            alt="Pepper House logó"
            width={360}
            height={120}
            className="h-14 w-auto sm:h-20"
            priority
          />
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Köszönjük a látogatást!
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Kérjük, ossza meg velünk élményét vagy észrevételét a vendéglátással kapcsolatban. Mi a Pepper House-nál kiemelt figyelmet szentelünk a visszajelzésekre. A véleménye anonim, és nagyon hálásak vagyunk érte!
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <label className="block text-center text-lg font-medium text-gray-700 mb-4">
              Melyik egységünket látogatta?
            </label>
            <select
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white text-gray-700"
            >
              <option value="">Kérem válasszon...</option>
              <option value="Államkincstár">Államkincstár</option>
              <option value="Közlekedés Tudományi Intézet">Közlekedés Tudományi Intézet</option>
              <option value="Knorr 105">Knorr 105</option>
              <option value="Knorr 86">Knorr 86</option>
              <option value="Knorr budai irodaház">Knorr budai irodaház</option>
              <option value="Riz Levente Sportközpont">Riz Levente Sportközpont</option>
              <option value="Szentkirályi kantin">Szentkirályi kantin</option>
            </select>
          </div>

          <div>
            <label className="block text-center text-lg font-medium text-gray-700 mb-4">
              Hogyan értékeli az élményét?
            </label>
            <StarRating />
            {rating > 0 && (
              <p className="text-center text-sm text-gray-500 mt-2">{rating} csillag kiválasztva</p>
            )}
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-3">
              Kérjük, írja meg benyomását vagy észrevételét
            </label>
            <textarea
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
              placeholder="Ossza meg velünk gondolatait..."
            />
          </div>

          <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Kérem, ha teheti értékelje az alábbiakat is
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Ezek opcionális dolgok, de sokat segíthet a kiszolgálás minőségének fejlesztésében!
            </p>
            <p className="text-sm text-gray-700 mb-4 font-medium">
              Az alábbi kérdésekre kérem jelölje, Ön mennyire elégedett ezek színvonalával (1 - egyáltalán nem elégedett, 5 - teljesen elégedett)
            </p>
            <div className="space-y-2">
              <NumberRating value={foodQuality} onChange={setFoodQuality} label="Az étel minősége" />
              <NumberRating value={serviceQuality} onChange={setServiceQuality} label="A kiszolgálás minősége" />
              <NumberRating value={pricing} onChange={setPricing} label="Árak megfelelősége" />
              <NumberRating value={cleanliness} onChange={setCleanliness} label="Tisztaság" />
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-3">
              Adja meg email címét, ha szeretné, hogy visszajelezzünk!
              <span className="text-sm text-gray-500 font-normal ml-2">(opcionális)</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              placeholder="pelda@email.com"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting || rating === 0 || !location}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              "Küldés..."
            ) : (
              <>
                <Send size={20} />
                Elküld
              </>
            )}
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2025 Pepper House. Minden jog fenntartva.</p>
        </div>
      </div>
    </div>
  );
}
