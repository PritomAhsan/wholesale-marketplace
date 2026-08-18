import { Suspense } from "react";

import Container from "@/components/layout/Container";

import RFQHero from "../components/RFQHero";
import RFQForm from "../components/RFQForm";
import RFQSidebar from "../components/RFQSidebar";
import MyRfqs from "../components/MyRfqs";

export default function RFQPage() {
    return (
        <>
            <RFQHero />

            <section className="bg-ivory py-16">

                <Container>

                    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">

                        <div>
                            <Suspense fallback={null}>
                                <RFQForm />
                            </Suspense>
                            <MyRfqs />
                        </div>

                        <RFQSidebar />

                    </div>

                </Container>

            </section>
        </>
    );
}