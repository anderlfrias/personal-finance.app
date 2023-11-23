import React from "react";
import { Table, useConfig } from "components/ui";
import { useTranslation } from "react-i18next";
import useScreenSize from 'utils/hooks/custom/useScreenSize'
import formatCurrency from "utils/formatCurrency";
import WalletItem from "./WalletItem";
import TFoot from "components/ui/Table/TFoot";

const { Tr, Th, Td, THead, TBody } = Table

const p = 'wallet'
function WalletList({ wallets, onClickItem }) {
	const { themeColor, primaryColorLevel } = useConfig()
    const { t } = useTranslation();
    const { width: screenWidth } = useScreenSize()

    return (
        <>
            {
                screenWidth < 768 ? (
                    <div className=' overflow-x-auto'>
                        { wallets.length > 0 ? (
                                <>
                                    {wallets.map((item, index) => <WalletItem key={index} wallet={item} onClick={() => onClickItem(item)} />)}
                                    <div className='flex justify-end font-bold mt-4'>
                                        <h6>{t(`${p}.table.total`)}: {formatCurrency(wallets.reduce((total, wallet) => total + wallet.balance, 0))}</h6>
                                    </div>
                                </>
                            ) : (
                                <div className='text-center text-gray-500'>{t(`${p}.table.empty`)}</div>
                            )
                        }
                    </div>
                ) :
                (
                    <Table>
                        <THead>
                            <Tr>
                                <Th>#</Th>
                                <Th>{t(`${p}.table.name`)}</Th>
                                <Th>{t(`${p}.table.description`)}</Th>
                                <Th>{t(`${p}.table.balance`)}</Th>
                                <Th />
                            </Tr>
                        </THead>
                        <TBody>
                            {
                                wallets.length > 0 ? wallets.map((wallet, index) => (
                                    <Tr key={index}>
                                        <Td>{index + 1}</Td>
                                        <Td>{wallet.name}</Td>
                                        <Td>{wallet.description}</Td>
                                        <Td>{formatCurrency(wallet.balance)}</Td>
                                        <Td>
                                            <div className={`min-w-max text-${themeColor}-${primaryColorLevel} cursor-pointer select-none font-semibold`} onClick={() => onClickItem(wallet)}>
                                                {t(`${p}.table.details`)}
                                            </div>
                                        </Td>
                                    </Tr>
                                )) :
                                <Tr>
                                    <Td colSpan={5} className='text-center'>
                                        {t(`${p}.table.empty`)}
                                    </Td>
                                </Tr>
                            }
                        </TBody>
                        <TFoot>
                            <Tr>
                                <Td colSpan={3} className='text-right'>
                                    <strong>{t(`${p}.table.total`)}</strong>
                                </Td>
                                <Td>
                                    <div className='flex justify-end font-bold'>
                                        <strong>{formatCurrency(wallets.reduce((total, wallet) => total + wallet.balance, 0))}</strong>
                                    </div>
                                </Td>
                            </Tr>
                        </TFoot>
                    </Table>
                )
            }
        </>
    )
}

export default WalletList