import createNextIntlPlugin from "next-intl/plugin";
import {validateEnv} from "./src/services/validateEnv.mjs";

const env = validateEnv();

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        ...env,
        NEXT_PUBLIC_DONOR_ID_INPUT_METHOD: env.DONOR_ID_INPUT_METHOD,
        NEXT_PUBLIC_DONOR_SURVEY_ENABLED: env.DONOR_SURVEY_ENABLED,
        NEXT_PUBLIC_DONOR_SURVEY_LINK: env.DONOR_SURVEY_LINK,
        NEXT_PUBLIC_FEEDBACK_SURVEY_ENABLED: env.FEEDBACK_SURVEY_ENABLED,
        NEXT_PUBLIC_FEEDBACK_SURVEY_LINK: env.FEEDBACK_SURVEY_LINK
    },
    experimental: {
        serverActions: {
            bodySizeLimit: 50 * 1024 * 1024, // Optional limit (50MB)
            allowedOrigins: ['nyu.dona.tf.uni-bielefeld.de', '127.0.0.1:9012'],
        }
    },
    webpack: (config) => {
        // Ignores fs module so that sql.js can be used in the browser
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
            path: false,
            crypto: false
        };
        // Allows loading svg from .svg file
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },
};

export default withNextIntl(nextConfig);