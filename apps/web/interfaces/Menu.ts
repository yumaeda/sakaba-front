export default interface Menu {
    readonly restaurantId: string
    readonly id: string
    readonly sortOrder: number
    readonly name: string
    readonly nameJpn: string
    readonly category: number
    readonly subCategory: number
    readonly region: number
    readonly price: number
    readonly isMinPrice: number
    readonly isHidden: number
}
