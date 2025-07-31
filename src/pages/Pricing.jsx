import React, { useState } from 'react';
import Header from '../components/Header';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';

function Pricing() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('vendor');

  const pricingPlans = {
    vendor: [
      {
        id: 'basix',
        name: t('basic_free'),
        price: 20,
        period: t('per_month'),
        features: [
          '7 Days Free',
          'Company charge 2% for each event',
          'Pay-per-booking',
          'CEX & DEX Liquidity Volume',
          'Code Base Reddit Link Summary',
          '30 AI Prompt Searches/Month'
        ],
        buttonText: t('get_this_plan'),
      },
      {
        id: 'standard',
        name: t('standard_plus'),
        price: 50,
        period: t('per_month'),
        features: [
          'Everything in Pro +',
          'Team Analysis',
          'No commission + top visibility in listings',
          'Developer Activity',
          'AI Whitepaper Analysis',
          'Red Flag Risk Score + AI Concern Report',
          'Unlimited AI Prompt Searches/Month'
        ],
        buttonText: t('coming_soon'),
        disabled: true,
      },
      {
        id: 'pro',
        name: t('pro'),
        price: 89,
        period: t('per_month'),
        features: [
          'Everything in Pro +',
          'Team Analysis',
          'Featured listing + reduced commission',
          'Developer Activity',
          'AI Whitepaper Analysis',
          'Red Flag Risk Score + AI Concern Report',
          'Unlimited AI Prompt Searches/Month'
        ],
        buttonText: t('coming_soon'),
        disabled: true,
      }
    ]
  };

  const comparisonFeatures = [
    {
      feature: 'Total Users',
      core: '-',
      standard: '5,000 Users',
      premium: '10,000 Users'
    },
    {
      feature: 'Personal Detail Security',
      core: '-',
      standard: 'Basic',
      premium: 'Advanced'
    },
    {
      feature: 'Bandwidth And Storage',
      core: '-',
      standard: '2 GB File Storage',
      premium: '10 GB File Storage'
    },
    {
      feature: 'Create Rolls',
      core: '-',
      standard: 'No',
      premium: 'Ultimate'
    },
    {
      feature: 'Admin User',
      core: '-',
      standard: '1 Admin',
      premium: '1 Admin'
    }
  ];

  const CheckIcon = () => (
    <img src="/assets/Tick.svg" alt="Tick" className="w-4 h-4 flex-shrink-0 rounded-full" />
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Pricing Section */}
      <div className="py-responsive px-responsive">
        <div className="container-7xl">
          {/* Tab Navigation */}

          {/* Pricing Header */}
          <div className="text-center mb-16">
            <h1 className="text-responsive-h2 font-bold text-gray-900 mb-4">
              {t('pricing_plans')}
            </h1>
            <p className="text-responsive-body text-gray-600 max-w-2xl mx-auto">
              {t('pricing_description')}
            </p>
          </div>

          {/* Pricing Cards */}
          <div
            className={`grid grid-cols-1 md:grid-cols-3 max-w-5xl gap-4 mb-16 justify-center items-stretch mx-auto`}
          >
            {pricingPlans.vendor.map((plan) => (
              <div
                key={plan.id}
                className={`bg-white rounded-2xl p-12 shadow-sm border transition-all duration-300 h-full flex flex-col ${
                  plan.popular ? 'border-primary-500 shadow-lg' : 'border-gray-200'
                } ${plan.disabled ? 'opacity-60' : 'hover:shadow-lg'}`}
              >
                <div className="flex-grow flex flex-col">
                  <div className="text-left mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                    <div className="flex items-baseline justify-start">
                      <span className="text-xl font-bold text-gray-900 mr-1">£</span><span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600 ml-2">{plan.period}</span>
                    </div>
                  </div>
                  <div className="space-y-4 mb-20 mt-4">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckIcon />
                        <span className="text-gray-700 text-md">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center w-full mt-auto">
                  <button
                    className={`w-full max-w-xs py-2 rounded-xl text-lg font-medium ${
                      plan.disabled
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'btn-primary-mobile hover:shadow-xl transform hover:scale-105 transition-all duration-300'
                    }`}
                    disabled={plan.disabled}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className={`bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mt-8 mx-auto max-w-5xl`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Core</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Standard Tier</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Premium Tier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparisonFeatures.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-left text-md text-gray-900 font-medium">{row.feature}</td>
                      <td className="px-6 py-4 text-left text-md text-gray-700">
                          <span className="inline-flex items-center gap-2 text-black font-medium"><CheckIcon /> {row.standard}</span>
                      </td>
                      <td className="px-6 py-4 text-left text-md text-gray-700">
                          <span className="inline-flex items-center gap-2 text- font-medium"><CheckIcon /> {row.premium}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>


        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Pricing;
