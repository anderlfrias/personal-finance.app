import React from "react";
import { Table, useConfig } from "components/ui";
import { useTranslation } from "react-i18next";
import useScreenSize from 'utils/hooks/custom/useScreenSize'
import CategoryItem from "./CategoryItem";

const { Tr, Th, Td, THead, TBody } = Table

const p = 'category'
function CategoryList({ categories, onClickItem }) {
	const { themeColor, primaryColorLevel } = useConfig()
    const { t } = useTranslation();
    const { width: screenWidth } = useScreenSize()

    return (
        <>
            {
                screenWidth < 768 ? (
                    <div className=' overflow-x-auto'>{
                        categories.length > 0 ? categories.map((item, index) => (
                            <CategoryItem key={index} category={item} onClick={() => onClickItem(item)} />
                        )) :
                            <div className='text-center text-gray-500'>{t(`${p}.table.empty`)}</div>
                    }</div>
                ) :
                (
                  <Table>
                    <THead>
                      <Tr>
                        <Th>#</Th>
                        <Th>{t(`${p}.table.name`)}</Th>
                        <Th>{t(`${p}.table.description`)}</Th>
                        <Th />
                      </Tr>
                    </THead>
                    <TBody>
                      {
                        categories.length > 0 ? categories.map((category, index) => (
                          <Tr key={index}>
                            <Td>{index + 1}</Td>
                            <Td>{category.name}</Td>
                            <Td>{category.description}</Td>
                            <Td>
                              <div className={`min-w-max text-${themeColor}-${primaryColorLevel} cursor-pointer select-none font-semibold`} onClick={() => onClickItem(category)}>
                                {t(`${p}.table.details`)}
                              </div>
                            </Td>
                          </Tr>
                        )) :
                        <Tr>
                          <Td colSpan={4} className='text-center'>
                            {t(`${p}.table.empty`)}
                          </Td>
                        </Tr>
                      }
                    </TBody>
                </Table>
                )
            }
        </>
    )
}

export default CategoryList