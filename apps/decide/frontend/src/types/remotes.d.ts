declare module "checkout/checkout-add-to-cart" {
    const CheckoutAddToCart: React.ComponentType<{ sku: string }>;
    export default CheckoutAddToCart;
}

declare module "explore/explore-header" {
    const ExploreHeader: React.ComponentType;
    export default ExploreHeader;
}

declare module "explore/explore-footer" {
    const ExploreFooter: React.ComponentType;
    export default ExploreFooter;
}

declare module "explore/explore-recommendations" {
    const ExploreRecommendations: React.ComponentType<{ skus?: string }>;
    export default ExploreRecommendations;
}