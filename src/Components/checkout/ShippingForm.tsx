
import { useState } from "react";

import {
  shippingSchema,
  type ShippingDetails,
} from "../../Schemas/shippingSchema";

interface ShippingFormProps {
  initialValues: ShippingDetails;
  onContinue: (details: ShippingDetails) => void;
  onBack: () => void;
}

function ShippingForm({
  initialValues,
  onContinue,
  onBack,
}: ShippingFormProps) {

  const [formData, setFormData] =
    useState<ShippingDetails>(initialValues);

  const [errors, setErrors] =
    useState<Partial<Record<keyof ShippingDetails, string>>>({});

  const handleChange = (
    field: keyof ShippingDetails,
    value: string
  ) => {

    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {

    e.preventDefault();

    const result = shippingSchema.safeParse(formData);

    if (!result.success) {

      const fieldErrors =
        result.error.flatten().fieldErrors;

      setErrors({
        fullName: fieldErrors.fullName?.[0],
        email: fieldErrors.email?.[0],
        phone: fieldErrors.phone?.[0],
        address: fieldErrors.address?.[0],
        city: fieldErrors.city?.[0],
        postalCode: fieldErrors.postalCode?.[0],
      });

      return;
    }

    setErrors({});

    onContinue(result.data);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">

      <h2 className="text-2xl font-bold mb-6">
        Shipping Information
      </h2>

      <form onSubmit={handleSubmit} noValidate>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <label htmlFor="fullName" className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                handleChange("fullName", e.target.value)
              }
              className="w-full border border-gray-300 rounded p-3"
            />

            {errors.fullName && (
              <p className="text-red-600 text-sm mt-1">
                {errors.fullName}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 font-medium">
              Email
            </label>

            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                handleChange("email", e.target.value)
              }
              className="w-full border border-gray-300 rounded p-3"
            />

            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block mb-2 font-medium">
              Phone Number
            </label>

            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                handleChange("phone", e.target.value)
              }
              className="w-full border border-gray-300 rounded p-3"
            />

            {errors.phone && (
              <p className="text-red-600 text-sm mt-1">
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="address" className="block mb-2 font-medium">
              Address
            </label>

            <input
              id="address"
              type="text"
              value={formData.address}
              onChange={(e) =>
                handleChange("address", e.target.value)
              }
              className="w-full border border-gray-300 rounded p-3"
            />

            {errors.address && (
              <p className="text-red-600 text-sm mt-1">
                {errors.address}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="city" className="block mb-2 font-medium">
              City
            </label>

            <input
              id="city"
              type="text"
              value={formData.city}
              onChange={(e) =>
                handleChange("city", e.target.value)
              }
              className="w-full border border-gray-300 rounded p-3"
            />

            {errors.city && (
              <p className="text-red-600 text-sm mt-1">
                {errors.city}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="postalCode" className="block mb-2 font-medium">
              Postal Code
            </label>

            <input
              id="postalCode"
              type="text"
              value={formData.postalCode}
              onChange={(e) =>
                handleChange("postalCode", e.target.value)
              }
              className="w-full border border-gray-300 rounded p-3"
            />

            {errors.postalCode && (
              <p className="text-red-600 text-sm mt-1">
                {errors.postalCode}
              </p>
            )}
          </div>

        </div>

        <div className="flex justify-between gap-4 mt-8">

          <button
            type="button"
            onClick={onBack}
            className="bg-gray-200 px-6 py-3 rounded cursor-pointer"
          >
            Back
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 cursor-pointer"
          >
            Continue to Payment Summary
          </button>

        </div>

      </form>

    </div>
  );
}

export default ShippingForm;
