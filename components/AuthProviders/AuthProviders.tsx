"use client";

import { getProviders, signIn } from "next-auth/react";
import { type } from "os";
import { useState, useEffect } from "react";
import Button from "../Button/Button";

type Provider = {
    id: string;
    name: string;
    type: string;
    signinUrl: string;
    callbackUrl: string;
    signinUrlParams?: Record<string, string> | null;
};

type Providers = Record<string, Provider>;

const AuthProviders = () => {
    const [providers, setProviders] = useState<Providers | null>(null);

    useEffect(() => {
        const fetchProviders = async () => {
            const providers = await getProviders();
            console.log(providers);
            setProviders(providers);
        };
        fetchProviders();
    }, []);

    if (providers) {
        return (
            <div>
                {Object.values(providers).map((provider: Provider) => (
                    <Button
                        handleClick={() => signIn(provider.id)}
                        key={provider.id}
                        title="Sign In"
                    />
                ))}
            </div>
        );
    }
};

export default AuthProviders;
