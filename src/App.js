import React, { useState, useEffect } from 'react';
import './App.css';

const mockApiResponse = {
  data: [
    {
      name: 'Mixmax',
      budget_name: 'Software subscription',
      owner_id: 1,
      spent: {
        value: 100,
        currency: 'SGD'
      },
      available_to_spend: {
        value: 1000,
        currency: 'SGD'
      },
      card_type: 'burner',
      expiry: '9 Feb 2024',
      limit: 100,
      status: 'active'
    },
    {
      name: 'Netflix',
      budget_name: 'Entertainment subscription',
      owner_id: 2,
      spent: {
        value: 50,
        currency: 'SGD'
      },
      available_to_spend: {
        value: 500,
        currency: 'SGD'
      },
      card_type: 'subscription',
      expiry: '21 May 2025',
      limit: 20,
      status: 'active'
    },
    {
      name: 'Amazon Prime',
      budget_name: 'Entertainment subscription',
      owner_id: 3,
      spent: {
        value: 30,
        currency: 'SGD'
      },
      available_to_spend: {
        value: 200,
        currency: 'SGD'
      },
      card_type: 'subscription',
      expiry: '1 Feb 2021',
      limit: 10,
      status: 'blocked'
    },
    {
      name: 'LinkedIn',
      budget_name: 'Category 1',
      owner_id: 4,
      spent: {
        value: 50,
        currency: 'SGD'
      },
      available_to_spend: {
        value: 500,
        currency: 'SGD'
      },
      card_type: 'burner',
      expiry: '10 Mar 2025',
      limit: 80,
      status: 'active'
    },
    {
      name: 'Traveller',
      budget_name: 'Category 2',
      owner_id: 5,
      spent: {
        value: 20,
        currency: 'SGD'
      },
      available_to_spend: {
        value: 150,
        currency: 'SGD'
      },
      card_type: 'burner',
      expiry: '15 Apr 2023',
      limit: 50,
      status: 'active'
    },
    {
      name: 'Marketing Ads',
      budget_name: 'Category 2',
      owner_id: 6,
      spent: {
        value: 10,
        currency: 'SGD'
      },
      available_to_spend: {
        value: 200,
        currency: 'SGD'
      },
      card_type: 'subscription',
      expiry: '9 Feb 2020',
      limit: 15,
      status: 'blocked'
    },
    {
      name: 'Offsite Events',
      budget_name: 'Category 3',
      owner_id: 7,
      spent: {
        value: 40,
        currency: 'SGD'
      },
      available_to_spend: {
        value: 300,
        currency: 'SGD'
      },
      card_type: 'subscription',
      expiry: '5 Nov 2024',
      limit: 25,
      status: 'active'
    },
    {
      name: 'AWS',
      budget_name: 'Category 3',
      owner_id: 8,
      spent: {
        value: 15,
        currency: 'SGD'
      },
      available_to_spend: {
        value: 400,
        currency: 'SGD'
      },
      card_type: 'burner',
      expiry: '20 Dec 2024',
      limit: 70,
      status: 'active'
    },
    {
      name: 'Google Card',
      budget_name: 'Category 1',
      owner_id: 9,
      spent: {
        value: 35,
        currency: 'SGD'
      },
      available_to_spend: {
        value: 250,
        currency: 'SGD'
      },
      card_type: 'subscription',
      expiry: '30 Jan 2021',
      limit: 30,
      status: 'blocked'
    }
  ],
  page: 1,
  per_page: 10,
  total: 9
};


const App = () => {
  const [cards, setCards] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [cardTypeFilter, setCardTypeFilter] = useState('');
  const [filteredCards, setFilteredCards] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);


  useEffect(() => {
    setCards(mockApiResponse.data);
  }, []);

  useEffect(() => {
    filterCards();
    // eslint-disable-next-line
  }, [activeTab, searchTerm, cardTypeFilter]);

  const filterCards = () => {
    let filteredData = cards;

    if (activeTab === 'Your') {
      filteredData = filteredData.filter((card) => card.owner_id === 1);
    } else if (activeTab === 'Blocked') {
      filteredData = filteredData.filter((card) => card.status === 'blocked');
    }

    if (searchTerm) {
      filteredData = filteredData.filter(
        (card) =>
          card.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (cardTypeFilter) {
      filteredData = filteredData.filter(
        (card) => card.card_type === cardTypeFilter
      );
    }

    setFilteredCards(filteredData);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterClick = () => {
    setShowDropdown((prevState) => !prevState);
  };

  const handleCardTypeChange = (event) => {
    setCardTypeFilter(event.target.value);
  };


  return (
    <div className="app">
      <nav className="navbar">
        <ul>
          <li
            onClick={() => handleTabClick('Your')}
            className={activeTab === 'Your' ? 'active' : ''}
          >
            Your
          </li>
          <li
            onClick={() => handleTabClick('All')}
            className={activeTab === 'All' ? 'active' : ''}
          >
            All
          </li>
          <li
            onClick={() => handleTabClick('Blocked')}
            className={activeTab === 'Blocked' ? 'active' : ''}
          >
            Blocked
          </li>
        </ul>
      </nav>

      <div className="search-filter">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by card name"
        />
        <button onClick={handleFilterClick}>
          {showDropdown ? 'Close' : 'Filter'}
        </button>
        {showDropdown && (
        <select value={cardTypeFilter} onChange={handleCardTypeChange}>
          <option value="">All Card Types</option>
          <option value="subscription">Subscription</option>
          <option value="burner">Burner</option>
        </select>
        )}
      </div>

      <div className="card-list">
        {filteredCards.map((card, index) => (
          <div key={index} className="card-item">
            {card.card_type === 'burner' && <img className="card-type-icon" src={burnImage} alt="Burner" />}
            {card.card_type === 'subscription' && <img className="card-type-icon" src={subscriptionImage} alt="Subscription" />}
            <div className="card-name">{card.name}</div>
            <div className="budget">{card.budget_name}</div>
            <div className="card-info">
              <div className="row">
                <div className="label">AMOUNT</div>
                <div className="value">{card.available_to_spend.value} {card.available_to_spend.currency}</div>
              </div>
              <div className="row">
                <div className="label">FREQUENCE</div>
                <div className="value">MONTHLY</div>
              </div>
              <div className="row">
                <div className="label">EXPIRY</div>
                <div className="value">{card.expiry}</div>
              </div>
            </div>
            <div className="progress-bar">
              <div className="spent-bar" style={{ width: `${(card.spent.value / card.available_to_spend.value) * 100}%` }}></div>
              <div className="balance-bar" style={{ width: `${((card.available_to_spend.value - card.spent.value) / card.available_to_spend.value) * 100}%` }}></div>
            </div>
            <div className="spent">
              <div className="spent-circle"></div>
              <div className="text">Spent</div>
              <div className="value">{card.spent.value} {card.spent.currency}</div>
            </div>
            <div className="balance">
              <div className="balance-circle"></div>
              <div className="text">Balance</div>
              <div className="value">{card.available_to_spend.value - card.spent.value} {card.available_to_spend.currency}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
