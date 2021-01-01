import express from "express";
import url from "url";

export function fullUrl(req: express.Request) {
    return url.format({
        protocol: req.protocol,
        host: req.get('host'),
        pathname: req.originalUrl
    });
};
