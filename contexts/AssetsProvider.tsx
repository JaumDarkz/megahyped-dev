import { createContext, useCallback, useEffect, useState } from "react"
import { Metaplex } from "@metaplex-foundation/js"
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js"

export type Asset = {
    name: string
    image: string
    mintAddress: string
    address: any
}

interface IAssetContext {
    assets: Asset[]
    wallet: string
    assetsUpdated: boolean
    fetchAssets: () => any
    setAssets: (assets: Asset[]) => void
    setWallet: (wallet: string) => any
}

export const AssetsContext = createContext<IAssetContext>({
    assets: [],
    wallet: "",
    assetsUpdated: false,
    fetchAssets: () => { },
    setAssets: () => { },
    setWallet: (wallet: string) => { }
})

const AssetsProvider = ({ children }) => {
    const [assets, setAssets] = useState<Asset[]>([])
    const [wallet, setWallet] = useState<string>("")
    const [assetsUpdated, setAssetsUpdated] = useState<boolean>(false)
    const [rpcUrl, setRpcUrl] = useState<string>("")
    
    const connection = new Connection("https://solana-mainnet.g.alchemy.com/v2/-aed3A2DaNwd7ey8fHzZO_iuu-h7z_Ms");
    const metaplex = new Metaplex(connection);

    const fetchAssets = useCallback(async () => {
        if (!wallet) return;
        const data = await metaplex.nfts().findAllByOwner({
            owner: wallet as any,
        });
    
        // filter out assets where the property symbol is not "MGH"
        const filteredData = data.filter((asset) => asset.symbol === "MGH");
    
        // Use the setAssets function to update the state
        setAssets([]);
    
        // Use Promise.all to wait for all metadata requests to complete
        const assetsData = await Promise.all(filteredData.map(async (asset) => {
            const metadata = await fetch(asset.uri);
            const json = await metadata.json();

            return {
                name: json.name,
                image: json.image,
                // @ts-ignore
                mintAddress: asset.mintAddress,
                address: asset.address,
            };
        }));
    
        // Update the state with the new assets
        setAssets(assetsData);
    }, [connection, metaplex, wallet, fetch]);
    

    useEffect(() => {
        if(!wallet) return
        setAssets([])
        fetchAssets()
    }, [wallet])
    
    return (
        <AssetsContext.Provider value={{ assets, wallet, assetsUpdated, fetchAssets, setAssets, setWallet }}>
            {children}
        </AssetsContext.Provider>
    )
}

export default AssetsProvider


