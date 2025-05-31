import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (

    // Responsive Design

    <section className="relative overflow-hidden py-10 bg-gray-500 border-t border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap -mx-4">

          {/* Logo & Copyright */}
          <div className="w-full md:w-1/2 lg:w-5/12 px-4 mb-8 md:mb-0">
            <div className="flex flex-col h-full justify-between">
              <div className="mb-4">
                <Logo width="100px" />
              </div>
              <p className="text-sm text-gray-600">
                &copy; {new Date().getFullYear()} All Rights Reserved by DevUI.
              </p>
            </div>
          </div>

          {/* Company Links */}
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-2/12 px-4 mb-8 md:mb-0">
            <h3 className="text-xs font-semibold uppercase text-gray-500 mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li><Link className="text-base text-gray-800 hover:text-gray-600" to="/">Features</Link></li>
              <li><Link className="text-base text-gray-800 hover:text-gray-600" to="/">Pricing</Link></li>
              <li><Link className="text-base text-gray-800 hover:text-gray-600" to="/">Affiliate Program</Link></li>
              <li><Link className="text-base text-gray-800 hover:text-gray-600" to="/">Press Kit</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-2/12 px-4 mb-8 md:mb-0">
            <h3 className="text-xs font-semibold uppercase text-gray-500 mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li><Link className="text-base text-gray-800 hover:text-gray-600" to="/">Account</Link></li>
              <li><Link className="text-base text-gray-800 hover:text-gray-600" to="/">Help</Link></li>
              <li><Link className="text-base text-gray-800 hover:text-gray-600" to="/">Contact Us</Link></li>
              <li><Link className="text-base text-gray-800 hover:text-gray-600" to="/">Customer Support</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-3/12 px-4">
            <h3 className="text-xs font-semibold uppercase text-gray-500 mb-4">
              Legals
            </h3>
            <ul className="space-y-2">
              <li><Link className="text-base text-gray-800 hover:text-gray-600" to="/">Terms & Conditions</Link></li>
              <li><Link className="text-base text-gray-800 hover:text-gray-600" to="/">Privacy Policy</Link></li>
              <li><Link className="text-base text-gray-800 hover:text-gray-600" to="/">Licensing</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </section>

  )
}

export default Footer