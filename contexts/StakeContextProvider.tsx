import { createContext, useState } from 'react'

interface IStakeContext {
    nftMintAddress: string
    setNftMintAddress: (mintAddress: string) => void
    nftName: string
    setNftName: (name: string) => void
    nftFaction: string
    setNftFaction: (faction: string) => void
}

export const StakeContext = createContext<IStakeContext>({} as IStakeContext)

const StakeContextProvider = ({ children }) => {
    const [nftMintAddress, setNftMintAddress] = useState<string>('')
    const [nftName, setNftName] = useState<string>('')
    const [nftFaction, setNftFaction] = useState<string>('')

    return (
        <StakeContext.Provider value={{
            nftMintAddress,
            setNftMintAddress,
            nftName,
            setNftName,
            nftFaction,
            setNftFaction
        }}>
            {children}
        </StakeContext.Provider>
    )
}

export default StakeContextProvider