import React from 'react';

export default function Footer() {
    return (
        <footer className="flex flex-col md:flex-row justify-between w-full py-10">
            <div className="w-full md:w-1/2">
                <h2 className="font-bold text-3xl">CONTACT WITH US</h2>
            </div>
            <div className="w-full md:w-1/2 text-sm md:text-md">
                <p>Email: example@example.com</p>
                <p>Phone: 123-456-7890</p>
                <p>Address: 123 Example St, Example City, EX 12345</p>
            </div>
        </footer>
    );
}
