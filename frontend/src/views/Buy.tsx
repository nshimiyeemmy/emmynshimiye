import React, { useState } from "react";

export default function Buy() {
  const [values, setvalues] = useState({
    meter: "",
    amount: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="w-full formInfo mx-auto max-w-lg p-20 mt-20 my-10">
        <div className="pb-8">
          <h2 className="text-3xl">Purchase electricity</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className=" py-2">
            <label htmlFor="" className="text-base">
              Meter number
            </label>
            <input
              required
              value={values.meter}
              onChange={(e) => setvalues({ ...values, meter: e.target.value })}
              type="number"
              placeholder="Meter number"
              className="focus:outline-none text-base block w-full px-4 py-3 mt-2 focus:border-blue-500 rounded border-2"
            />
          </div>
          <div className="py-2">
            <label htmlFor="" className="text-base">
              Enter amount - (RWF)
            </label>
            <input
              required
              value={values.amount}
              onChange={(e) =>
                setvalues({ ...values, amount: parseFloat(e.target.value) })
              }
              type="number"
              placeholder="Enter amount here"
              className="focus:outline-none text-base block w-full px-4 py-3 mt-2 focus:border-blue-400 border-2"
            />
          </div>
          <div className="py-4">
            <button
              type="submit"
              className="py-3 px-10 bg-blue-800 text-white hover:bg-blue-900"
            >
              Purchase
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
