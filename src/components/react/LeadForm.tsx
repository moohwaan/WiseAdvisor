import React, { useState } from 'react';

interface LeadFormProps {
    labels: {
        title: string;
        name: string;
        email: string;
        phone: string;
        interest: string;
        message: string;
        submit: string;
        submitting: string;
        success: string;
        error: string;
        privacy: string;
        sendAnother: string;
        thankYou: string;
    }
}

const LeadForm = ({ labels }: LeadFormProps) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        interest: 'Financial Planning',
        message: '',
    });

    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        try {
            const form = new FormData();
            Object.entries(formData).forEach(([key, value]) => form.append(key, value));

            const response = await fetch('/api/leads', {
                method: 'POST',
                body: form,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to submit form');
            }

            setStatus('success');
            setFormData({ name: '', email: '', phone: '', interest: 'Financial Planning', message: '' });
        } catch (error: any) {
            console.error('Form submission error:', error);
            setStatus('error');
            setErrorMessage(error.message || labels.error);
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center animate-fade-in">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-2xl font-serif font-bold text-green-800 mb-2">{labels.thankYou}</h3>
                <p className="text-green-700">{labels.success}</p>
                <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-green-600 font-semibold hover:underline"
                >
                    {labels.sendAnother}
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-2xl font-serif font-bold text-navy-900 mb-6">{labels.title}</h3>

            {status === 'error' && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{errorMessage}</span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">{labels.name}</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-500 focus:border-royal-500 transition-colors"
                        placeholder="John Doe"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{labels.email}</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-500 focus:border-royal-500 transition-colors"
                        placeholder="john@example.com"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">{labels.phone}</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-500 focus:border-royal-500 transition-colors"
                        placeholder="+66 81 234 5678"
                    />
                </div>
                <div>
                    <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-1">{labels.interest}</label>
                    <select
                        id="interest"
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-500 focus:border-royal-500 transition-colors"
                    >
                        <option value="Financial Planning">Financial Planning</option>
                        <option value="Health Insurance">Health Insurance</option>
                        <option value="Education Fund">Education Fund</option>
                        <option value="Retirement">Retirement Planning</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>

            <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">{labels.message}</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-500 focus:border-royal-500 transition-colors"
                    placeholder="..."
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={status === 'submitting'}
                className={`w-full bg-royal-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-royal-700 transition-all transform hover:-translate-y-0.5 ${status === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
            >
                {status === 'submitting' ? labels.submitting : labels.submit}
            </button>

            <p className="mt-4 text-xs text-gray-500 text-center">
                {labels.privacy}
            </p>
        </form>
    );
};

export default LeadForm;
