// src/components/FeaturedMeals.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FeaturedMeals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    // Fetch the featured meals from your backend
    const fetchMeals = async () => {
      const response = await axios.get('/api/meals');
      setMeals(response.data);
    };

    fetchMeals();
  }, []);

  const handleFavoriteToggle = async (mealId) => {
    try {
      const response = await axios.put(`/api/meals/toggle-favorite/${mealId}`);
      setMeals((prevMeals) =>
        prevMeals.map((meal) =>
          meal._id === mealId ? { ...meal, isFavorite: response.data.meal.isFavorite } : meal
        )
      );
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <div>
      <h2>Featured Meals</h2>
      <div className="meal-list">
        {meals.map((meal) => (
          <div key={meal._id} className="meal-card">
            <h3>{meal.name}</h3>
            <p>{meal.description}</p>
            <button
              onClick={() => handleFavoriteToggle(meal._id)}
              style={{
                backgroundColor: meal.isFavorite ? 'gold' : 'lightgray',
              }}
            >
              {meal.isFavorite ? 'Unfavorite' : 'Favorite'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedMeals;
