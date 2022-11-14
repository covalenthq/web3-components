# Contributing
Thank you for taking the time to contribute!

The following is a set of general guidelines for contributing to this `web3-components` library repo. Use your best judgment, and feel free to propose changes to this document in a pull request.
​
This web3 library is powered by the [Covalent Unified API](https://www.covalenthq.com/docs/api/) and consists of useful React components to fetch any on-chain data across any of the Covalent supported blockchain networks for a variety of use cases.
​
## Guidelines
​
1. Add your component file into the `src/components` folder. The filename should be in `PascalCase` and signify the primary data or use case being addressed (e.g. `ERC20Transfers.js`).
​
2. If your component has any dependencies (e.g. helper functions), add them to the `src/utils` folder and import them into your component accordingly. Helper function filenames should be in `camelCase` (e.g. `erc20TransfersHelper.js`). 
​
3. Export your component in `src/index.js` following the existing convention. 

4. Preference is for functional components over class components.

5. Lint and test your code. For testing your component, one approach is to use `npm pack` and use the `web3-components` package in a new `create-react-app` project. 
​
## Resources
Here are some useful resources to help you out with building your components:

- [Covalent API Reference](https://covalenthq.com/docs/api)
- [Web3 Components Demo Repo](https://github.com/covalenthq/Web3-Components-Demo)
- [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)

## Feedback & Support
If you need any support as you build your components, message us in our [Discord](https://www.covalenthq.com/discord/) in the `#feedback-and-support` channel.
