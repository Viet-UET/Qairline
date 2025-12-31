import React from "react";
import { Settings, Shield, Bell, Palette } from "lucide-react";

function Card({ title, icon: Icon, children }) {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-[#E5E7EB]">
        <Icon className="h-4 w-4 text-gray-500" />
        <h2 className="font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

export default function AdminSettings() {
  return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General */}
        <Card title="General" icon={Settings}>
          <p className="text-sm text-gray-600">
            System-wide configuration such as airline name, timezone,
            currency, and default language.
          </p>
          <div className="mt-4 text-xs text-gray-500 italic">
            (Not implemented yet)
          </div>
        </Card>

        {/* Security */}
        <Card title="Security" icon={Shield}>
          <p className="text-sm text-gray-600">
            Admin authentication, roles, permissions and access control.
          </p>
          <div className="mt-4 text-xs text-gray-500 italic">
            (Planned: RBAC, audit log)
          </div>
        </Card>

        {/* Notifications */}
        <Card title="Notifications" icon={Bell}>
          <p className="text-sm text-gray-600">
            Email and system notification settings for bookings, flights
            and promotions.
          </p>
          <div className="mt-4 text-xs text-gray-500 italic">
            (Planned: email / in-app)
          </div>
        </Card>

        {/* Appearance */}
        <Card title="Appearance" icon={Palette}>
          <p className="text-sm text-gray-600">
            Theme, branding color and layout density preferences.
          </p>
          <div className="mt-4 text-xs text-gray-500 italic">
            (Theme locked for now)
          </div>
        </Card>
      </div>
      );
}
