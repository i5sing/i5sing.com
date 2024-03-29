import { createApp } from "./app";

/**
 * Created by zhaofeng on 2016/12/2.
 */
const isDev = process.env.NODE_ENV !== 'production';

export default function (context) {
    const s = isDev && Date.now();

    const { app, router, store } = createApp();
    // set router's location
    router.push(context.url);
    const matchedComponents = router.getMatchedComponents();

    // no matched routes
    if (!matchedComponents.length) {
        return Promise.reject({ code: '404' });
    }

    // Call preFetch hooks on components matched by the route.
    // A preFetch hook dispatches a store action and returns a Promise,
    // which is resolved when the action is complete and store state has been
    // updated.
    return Promise.all(matchedComponents.map(component => {
        if (component.preFetch) {
            return component.preFetch(store)
        }
    })).then(() => {
        isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`);
        // After all preFetch hooks are resolved, our store is now
        // filled with the state needed to render the app.
        // Expose the state on the render context, and let the request handler
        // inline the state in the HTML response. This allows the client-side
        // store to pick-up the server-side state without having to duplicate
        // the initial data fetching on the client.
        context.initialState = store.state;
        return app
    })
}
