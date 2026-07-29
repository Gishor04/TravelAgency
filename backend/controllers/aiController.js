import Itinerary from '../models/Itinerary.js';
import ChatHistory from '../models/ChatHistory.js';

export const handleChat = async (req, res) => {
  try {
    const { message, language = 'en', history = [] } = req.body;
    const lowerMsg = message.toLowerCase();

    let responseText = "";

    if (lowerMsg.includes('visa') || lowerMsg.includes('passport')) {
      responseText = "Most luxury destinations like Maldives, Bali (Indonesia), and Sri Lanka offer instant E-Visas or Visa-on-Arrival for 30–90 days. For Schengen (Switzerland, France) or Japan, our Concierge team handles full documentation review within 24 hours.";
    } else if (lowerMsg.includes('weather') || lowerMsg.includes('season') || lowerMsg.includes('when to visit')) {
      responseText = "Optimal travel windows for 2026:\n- Bali: April to October (Dry & Sunny)\n- Swiss Alps: Dec–April (Skiing) & June–Sept (Alpine Flowers)\n- Sri Lanka: Year-round (South Coast Nov–April, East Coast May–Sept)\n- Maldives: November to April (Crystal clear lagoon diving)";
    } else if (lowerMsg.includes('pack') || lowerMsg.includes('checklist')) {
      responseText = "Essential 2026 Travel Packing Checklist:\n1. Universal Type C/G Power Adapter & Power Bank\n2. Waterproof Action Cam / Drone\n3. High-SPF Reef-Safe Sunscreen & Linen Wear\n4. Digital Passport Copies & E-Visa Documents\n5. International Credit/Debit Card & Currency (USD)";
    } else if (lowerMsg.includes('budget') || lowerMsg.includes('price') || lowerMsg.includes('cost')) {
      responseText = "Our 2026 luxury packages range from:\n- Domestic/Sri Lanka Heritage: $799 – $1,500\n- Tropical Maldives & Bali Villas: $1,599 – $2,890\n- European Alpine & Japan Discoveries: $2,450 – $3,490\nAll packages include 5-star accommodations, private transfers, and curated itineraries.";
    } else if (lowerMsg.includes('hotel') || lowerMsg.includes('stay')) {
      responseText = "We partner exclusively with top 5-star luxury resorts including Viceroy Bali, Soneva Jani Maldives, The Chedi Andermatt Switzerland, and Ceylon Tea Trails. Enjoy complimentary room upgrades and VIP lounge access.";
    } else {
      responseText = `Thank you for consulting Aura AI 2026! How can I assist you further with destination guides, flight options, customized itineraries, or instant booking for your upcoming journey?`;
    }

    if (language === 'ta') {
      responseText = `[தமிழ்] Aura AI சேவை: ${responseText}`;
    } else if (language === 'si') {
      responseText = `[සිංහල] Aura AI සේවාව: ${responseText}`;
    }

    res.json({
      success: true,
      reply: responseText,
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const generateItinerary = async (req, res) => {
  try {
    const { destination, budget, travelersCount = 2, durationDays = 5, travelDates, interests = [], travelStyle = 'Luxury', hotelPreference = '5-Star Resort' } = req.body;

    const parsedDays = Number(durationDays) || 5;
    const dailyBudget = Math.round((Number(budget) || 2000) / parsedDays);

    const daysPlan = [];
    for (let i = 1; i <= parsedDays; i++) {
      daysPlan.push({
        day: i,
        title: `Day ${i}: ${i === 1 ? 'VIP Arrival & Sunset Elixirs' : i === parsedDays ? 'Leisurely Gourmet Brunch & Departure' : 'Curated Exploration & Cultural Immersion'}`,
        description: `Experience the finest of ${destination} with private chauffeur guide, exclusive access, and fine dining.`,
        morning: `Private breakfast at ${hotelPreference}. Sunrise guided walk around top landmark attractions.`,
        afternoon: `Gourmet lunch at top-rated Michelin/Chef-recommended restaurant. Signature activity: ${interests.join(', ') || 'Scenic Private Yacht & Photography'}.`,
        evening: `Candlelit ocean/skyline dinner. Est. Daily Budget: ~$${dailyBudget}.`,
        recommendedRestaurants: [`The ${destination} Terrace`, `Le Sky Bar`, `Fisherman's Cove`],
        highlights: [`Exclusive VIP Access`, `Private Chauffeur`]
      });
    }

    const estimatedBudget = {
      accommodation: Math.round(budget * 0.45),
      activitiesAndTours: Math.round(budget * 0.25),
      diningAndCulinary: Math.round(budget * 0.20),
      transfersAndLogistics: Math.round(budget * 0.10),
      totalEstimatedUSD: Number(budget) || 2000
    };

    const itineraryResult = {
      destination,
      durationDays: parsedDays,
      travelersCount,
      travelStyle,
      hotelPreference,
      estimatedBudget,
      dayByDay: daysPlan,
      travelTips: [
        `Book restaurant reservations at least 14 days in advance in ${destination}.`,
        `Carry local currency or international contactless card.`,
        `Our 24/7 concierge is available via WhatsApp throughout your stay.`
      ]
    };

    // Try saving if logged in
    if (req.user) {
      try {
        await Itinerary.create({
          user: req.user.id,
          destination,
          budget,
          travelersCount,
          durationDays: parsedDays,
          travelDates,
          interests,
          travelStyle,
          hotelPreference,
          generatedPlan: itineraryResult
        });
      } catch (e) {
        // silent fallback
      }
    }

    res.json({
      success: true,
      itinerary: itineraryResult
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
