
import React from 'react';
import {
  CalendarDays,
  Package,
  Clock,
  ShieldCheck,
  Bell,
  CheckCircle2,
  Circle
} from 'lucide-react';

export const ProductCard = ({ item }) => {
  const today = new Date();
  const expiryDate = new Date(item.warrantyEndDate);

  const daysLeft = Math.ceil(
    (new Date(expiryDate.toDateString()) -
      new Date(today.toDateString())) /
      (1000 * 60 * 60 * 24)
  );

  const status =
    daysLeft < 0
      ? { text: 'Expired', style: 'bg-red-100 text-red-700' }
      : daysLeft <= 7
      ? { text: 'Expiring Soon', style: 'bg-orange-100 text-orange-700' }
      : { text: 'Active', style: 'bg-emerald-100 text-emerald-700' };

  const reminders = [
    { label: '1 Month Before', sent: item.monthReminderSent },
    { label: '1 Week Before', sent: item.weekReminderSent },
    { label: '1 Day Before', sent: item.dayReminderSent }
  ];

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">

      {/* Product Image */}
      <div className="h-48 w-full overflow-hidden bg-gray-100">
        {item.image ? (
          <img
            src={item.image}
            alt={item.productName}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-blue-500">
            <Package size={60} />
          </div>
        )}
      </div>

      {/* Header */}
      <div className="flex items-start justify-between border-b border-gray-100 p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
            <Package size={25} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800">
              {item.productName}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {item.category}
            </p>
          </div>
        </div>

        <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${status.style}`}>
          {status.text}
        </span>
      </div>

      {/* Product Details */}
      <div className="space-y-4 p-5">

        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-gray-50 p-2.5 text-gray-500">
            <CalendarDays size={20} />
          </div>

          <div>
            <p className="text-xs text-gray-400">Purchase Date</p>
            <p className="mt-1 text-sm font-semibold text-gray-800">
              {new Date(item.purchaseDate).toLocaleDateString('en-IN')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-gray-50 p-2.5 text-gray-500">
            <Clock size={20} />
          </div>

          <div>
            <p className="text-xs text-gray-400">Warranty Expiry Date</p>
            <p className="mt-1 text-sm font-semibold text-gray-800">
              {expiryDate.toLocaleDateString('en-IN')}
            </p>
          </div>
        </div>

        {/* Warranty Progress */}
        <div className={`rounded-xl p-4 ${
          daysLeft < 0
            ? 'bg-red-50'
            : daysLeft <= 7
            ? 'bg-orange-50'
            : 'bg-emerald-50'
        }`}>
          <div className="flex items-center gap-2">
            <ShieldCheck
              size={20}
              className={
                daysLeft < 0
                  ? 'text-red-600'
                  : daysLeft <= 7
                  ? 'text-orange-600'
                  : 'text-emerald-600'
              }
            />

            <p className="text-sm font-semibold text-gray-700">
              Warranty Information
            </p>
          </div>

          <p className={`mt-2 text-xl font-bold ${
            daysLeft < 0
              ? 'text-red-600'
              : daysLeft <= 7
              ? 'text-orange-600'
              : 'text-emerald-600'
          }`}>
            {daysLeft < 0
              ? `Expired ${Math.abs(daysLeft)} days ago`
              : daysLeft === 0
              ? 'Expires Today'
              : `${daysLeft} Days Left`}
          </p>
        </div>

        {/* Reminder Section */}
        <div className="border-t border-gray-100 pt-4">
          <div className="mb-4 flex items-center gap-2">
            <Bell size={18} className="text-blue-600" />
            <h3 className="text-sm font-bold text-gray-800">
              Email Reminders
            </h3>
          </div>

          <div className="space-y-3">
            {reminders.map((reminder) => (
              <div
                key={reminder.label}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  {reminder.sent ? (
                    <CheckCircle2 size={17} className="text-emerald-500" />
                  ) : (
                    <Circle size={17} className="text-gray-400" />
                  )}

                  <span className="text-sm text-gray-600">
                    {reminder.label}
                  </span>
                </div>

                <span className={`text-xs font-semibold ${
                  reminder.sent ? 'text-emerald-600' : 'text-gray-400'
                }`}>
                  {reminder.sent ? 'Sent' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
