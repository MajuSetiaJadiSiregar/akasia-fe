import { NextPage } from "next";
import DataTable, { TableColumn } from 'react-data-table-component';
import { wishList } from "model/whistlist";
import { useStoreWishList } from "store/wishlist";
import Container from "components/Container";

const WishList: NextPage = () => {

  const {wishlists} = useStoreWishList();

  
  const columns: TableColumn<wishList>[] = [
    {
        name: 'Name',
        selector: row => row.name,
    },
    {
        name: 'Population',
        selector: row => row.population,
    },
    {
        name: 'Climate',
        selector: row => row.climate,
    },
    {
      name: 'Created',
      selector: row => row.createdDate,
    },
  ];

    return (
      <Container title="Customers">
       <DataTable 
        columns={columns} 
        data={wishlists}  
        fixedHeader                                 
        selectableRowsHighlight                                
        highlightOnHover 
        pagination />
      </Container>
    );
};

export default WishList;