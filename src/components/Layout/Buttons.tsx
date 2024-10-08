import React from 'react';

interface itemModel {
  itemLabel: string;
  itemPrice: number;
}
const Buttons = () => {
  const items: itemModel[] = [
    {
      itemLabel: 'Contribute $10',
      itemPrice: 10,
    },
    {
      itemLabel: 'Contribute $20',
      itemPrice: 20,
    },
    {
      itemLabel: 'Contribute $50',
      itemPrice: 50,
    },
    {
      itemLabel: 'Contribute $100',
      itemPrice: 100,
    },
    {
      itemLabel: 'Contribute $200',
      itemPrice: 200,
    },
    {
      itemLabel: 'Contribute $500',
      itemPrice: 500,
    },
  ];
  return (
<div className="flex flex-col w-full md:w-1/3 bg-gray-800 p-4">
  <h2 className="text-white text-2xl mb-4">Support the Stream  </h2>
  <div className='hidden sm:block h-auto rounded-xl border border-white my-4 p-4'>
  <p className="text-white text-2xl">
    🎉 Let's celebrate with a small party! 🎉
  </p>
  <p className="text-white mt-2">
    Join us for some fun, music, and good vibes! 🥳 Don't miss out!
  </p>
</div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {items.map((image, index) => (
     <button className="btn btn-accent text-white">{image.itemLabel}</button>
          ))}

  </div>
</div>
  );
};

export default Buttons;