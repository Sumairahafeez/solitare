import React from 'react';
//winpage component that displays a congratulations message when the user winds a specific game
function WinPage() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-10 text-center max-w-md text-gray-900">
                <h1 className="text-4xl font-bold mb-4 text-green-600">You Won the Game!</h1>
                <p className="text-2xl mb-4">Congratulations on your victory!</p>
                <p className="text-lg text-gray-600">Enjoy your success!</p>
            </div>
        </div>
    );
}

export default WinPage;
