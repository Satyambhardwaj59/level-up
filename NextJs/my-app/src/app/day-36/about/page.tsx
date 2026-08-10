// app/about/page.tsx /day-36
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Product Store',
  description: 'Learn more about our store',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600 mb-4">
          Welcome to Product Store, your number one source for all things
          products. We&apos;re dedicated to providing you the best of products,
          with a focus on dependability, customer service, and uniqueness.
        </p>
        <p className="text-gray-600 mb-4">
          Founded in 2024, Product Store has come a long way from its beginnings
          in a small office. When we first started out, our passion for providing
          the best products drove us to start our own business.
        </p>
        <p className="text-gray-600">
          We hope you enjoy our products as much as we enjoy offering them to
          you. If you have any questions or comments, please don&apos;t hesitate
          to contact us.
        </p>
      </div>
    </div>
  );
}