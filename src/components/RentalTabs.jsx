import rentalIcon from '../assets/icons/rentalslogo.svg';
import rentalTabImg from '../assets/images/rentalstab.png';
import servicesIcon from '../assets/icons/serviceslogo.svg';
import servicesTabImg from '../assets/images/servicestab.png';
import eventsIcon from '../assets/icons/eventslogo.svg';
import eventsTabImg from '../assets/images/eventstab.png';
import classifiedsIcon from '../assets/icons/classifiedlogo.svg';
import classifiedsTabImg from '../assets/images/classifiedtab.png';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const RentalTabs = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('rental')

  const tabs = [
    {
      id: 'rental',
      name: t('rental'),
      icon: rentalIcon,
      image: rentalTabImg
    },
    {
      id: 'services',
      name: t('services'),
      icon: servicesIcon,
      image: servicesTabImg
    },
    {
      id: 'events',
      name: t('events'),
      icon: eventsIcon,
      image: eventsTabImg
    },
    {
      id: 'classifieds',
      name: t('classifieds'),
      icon: classifiedsIcon,
      image: classifiedsTabImg
    }
  ]

  const getTabContent = () => {
    switch (activeTab) {
      case 'rental':
        return {
          title: 'Rental',
          subtitle: 'e.g. vehicles, apartments or products',
          description: 'Users can choose check in & out date 📅, number of guests 👥 or extra service 🛎️ and send a request to the host to book a reservation. Once the host accepts request user can be charged for the entire amount at reserved time (payments are processed through WooCommerce).',
          features: [
            'Availability Calendar (single and multi-days)',
            'Hourly Booking (Start / End Time - helpful for renting cars, bikes etc.)',
            'Regular, weekend and custom price per night or hour',
            'Max. guests per reservation and minimum stay',
            'Mandatory Fees (e.g. cleaning service)',
            'Instant Booking (without owner approval)',
            'Extra Paid Services',
            'Children & Animals (custom prices)',
            'QR Code Verification System'
          ]
        }
      case 'services':
        return {
          title: 'Services',
          subtitle: 'e.g. restaurants, barbers, doctors',
          description: 'Users can reserve spots at e.g. restaurants 🍝 barbers 💈 etc. They can choose date and time or specific hour. If time slots are non set - in this case time picker will be displayed in the booking widget instead of time slots and guests will be able to make reservations only in opening hours range.',
          additionalText: 'Everything from rental method plus:',
          features: [
            'Availability Calendar (single day)',
            'Time Slots or Time Picker'
          ],
          link: {
            text: 'Time Slots Video →',
            color: 'text-pink-500'
          }
        }
      case 'events':
        return {
          title: 'Events',
          subtitle: 'e.g. concerts, conferences',
          description: 'Online ticketing system 🎫 for any type of venue or event. Users can add event listings on your website while also sell tickets for those events.',
          features: [
            'Start & End Date',
            'Ticket Price',
            'Max. Available Tickets',
            'Pricing Menu',
            'Extra Services'
          ]
        }
      case 'classifieds':
        return {
          title: 'Classifieds',
          subtitle: 'Let people sell new or used products',
          description: 'Advertising feature that brings buyers and sellers together when someone wants to sell a car, buy new patio furniture, buy new smartphone or find a new babysitter for his kid. 👶'
        }
      default:
        return null
    }
  }

  const content = getTabContent()
  const isImageLeft = activeTab === 'services' || activeTab === 'classifieds';

  return (
    <section className="py-16 px-6 lg:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div
            className="flex flex-row flex-nowrap overflow-x-auto scrollbar-hide bg-transparent border-b border-gray-200 w-full max-w-full px-1 sm:px-2 md:px-0 space-x-1 sm:space-x-3 md:space-x-8 md:justify-center md:overflow-x-visible md:w-auto md:max-w-none"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center px-1.5 sm:px-3 md:px-6 py-1 sm:py-2 md:py-4 text-[11px] sm:text-xs md:text-base transition-all duration-300 font-medium border-b-2 min-w-[70px] sm:min-w-[90px] md:min-w-0 justify-center ${
                  activeTab === tab.id
                    ? 'text-red-500 border-gradient-underline'
                    : 'text-gray-600 hover:text-gray-900 border-transparent hover:border-gray-300'
                }`}
                style={{ minHeight: '38px' }}
              >
                <img
                  src={tab.icon}
                  alt={tab.name}
                  className={`w-3 h-3 sm:w-5 sm:h-5 md:w-5 md:h-5 mr-1 sm:mr-2`}
                />
                <span className="font-medium leading-none">{tab.name}</span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-secondary via-primary-500 to-primary-600 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            {/* Image and Content - alternate on desktop, image always on top on mobile */}
            <div className={`bg-white flex items-center justify-center p-2 w-full lg:w-1/2 ${isImageLeft ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}>
              <div className="w-full h-full max-w-lg">
                <img
                  src={tabs.find(tab => tab.id === activeTab)?.image}
                  alt={tabs.find(tab => tab.id === activeTab)?.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <div className="w-full h-full bg-gray-200 hidden items-center justify-center rounded-lg">
                  <span className="text-gray-500 text-lg font-semibold">
                    {tabs.find(tab => tab.id === activeTab)?.name} Preview
                  </span>
                </div>
              </div>
            </div>
            <div className={`p-8 lg:p-12 w-full lg:w-1/2 ${isImageLeft ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}`}>
              {/* Content */}
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.title}</h2>
              <p className="inline-block text-red-500 font-medium mb-4 bg-red-100 rounded-lg text-sm py-2 px-2">
                {content.subtitle}
              </p>
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  {content.description}
                </p>

                {content.additionalText && (
                  <div className="bg-gray-900 text-white px-4 py-2 rounded-lg inline-block">
                    <span className="text-sm font-medium">{content.additionalText}</span>
                  </div>
                )}

                {content.features && (
                  <div className="space-y-4">
                    {content.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700">
                          {feature.includes('(') ? (
                            <>
                              <strong>{feature.split('(')[0].trim()}</strong>
                              {feature.includes('(') && ` (${feature.split('(')[1]}`}
                            </>
                          ) : (
                            <strong>{feature}</strong>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {content.link && (
                  <div className="mt-6">
                    <button className={`font-medium ${content.link.color} hover:underline`}>
                      {content.link.text}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RentalTabs
