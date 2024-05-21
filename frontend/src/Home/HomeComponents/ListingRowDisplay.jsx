import {Table, TableHead,TableBody,TableCell,TableRow, Flex, Text, Button, Card, Badge } from "@aws-amplify/ui-react";
import React, { useState, useEffect } from "react";



const ListingRowDisplay = () => {

    return(
        
    <Table>
    <TableHead>
        <TableRow>
            <TableCell as="th">物業名稱</TableCell>
            <TableCell as="th">位置</TableCell>
            <TableCell as="th">樓齡</TableCell>
            <TableCell as="th">實用面積</TableCell>
            <TableCell as="th">呎價</TableCell>
            <TableCell as="th">樓價(港幣)</TableCell>
            <TableCell as="th">30天叫價(%變化)</TableCell>
            <TableCell as="th"></TableCell>
        </TableRow>
    </TableHead>
    <TableBody>
        <TableRow>
            <TableCell>
                <Flex className="row-display-listing-name-gp" direction="column">
                    <Text>物業編號:</Text>
                    <Text>物業名稱</Text>
                    <Text>中層</Text>
                    <Flex className="row-display-listing-name-tag" direction="row">
                        <Badge>test</Badge>
                        <Badge>test</Badge>
                        <Badge>test</Badge>
                    </Flex>
                </Flex>
            </TableCell>
            <TableCell>Test</TableCell>
            <TableCell>Test</TableCell>
            <TableCell>Test</TableCell>
            <TableCell>
            <Flex className="row-display-listing-sqft-price" direction="column"> 
            <Text>Test</Text>
            <Text>Test</Text>
            </Flex>
            </TableCell>
            <TableCell>
            <Flex className="row-display-listing-sqft-price" direction="column"> 
            <Text>Test</Text>
            <Text>Test</Text>
            </Flex>
            </TableCell>
            <TableCell>
            <Flex className="row-display-listing-sqft-price" direction="column"> 
            <Text>Test</Text>
            <Text>Test</Text>
            </Flex>
            </TableCell>
            <TableCell>
            <Flex className="row-display-listing-sqft-price" direction="column"> 
            <Text>Test</Text>
            <Text>Test</Text>
            </Flex>
            </TableCell>
        </TableRow>

    </TableBody>
</Table>

    )
}

export default ListingRowDisplay