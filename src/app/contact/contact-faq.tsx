import { Card, CardContent } from "@/components/ui/card";

const ContactFaq = () => {
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-2 font-semibold">How do I cancel a booking?</h3>
            <p className="text-sm text-muted-foreground">
              You can cancel a booking from your account dashboard. Go to "My
              Trips," find the booking you want to cancel, and click "Cancel
              Booking." Refund policies vary by property.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-2 font-semibold">How do I become a host?</h3>
            <p className="text-sm text-muted-foreground">
              To become a host, create an account and click "Become a Host" in
              your dashboard. You'll need to provide details about your
              property, set pricing, and upload photos.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-2 font-semibold">How are payments processed?</h3>
            <p className="text-sm text-muted-foreground">
              We use secure payment processing through Stripe. Guests pay when
              booking, and hosts receive payment 24 hours after check-in, minus
              our service fee.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-2 font-semibold">
              What if there's an issue with my stay?
            </h3>
            <p className="text-sm text-muted-foreground">
              If you encounter any issues during your stay, please contact the
              host first. If the issue isn't resolved, our 24/7 customer support
              team is available to help.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ContactFaq;
