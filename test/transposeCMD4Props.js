'use strict';

// ***************** TEST LOADING **********************

var { transposeConstantToValidValue,
      transposeValueToValidConstant,
      extractKeyValue } = require( "../utils/transposeCMD4Props" );


// ***************** TEST Plugin Initialized Variables ***************

describe( "Initializing our CMD4 Libraries ", ( ) => {});

var _api = new HomebridgeAPI( ); // object we feed to Plugins

 // Init the library for all to use
let CMD4_ACC_TYPE_ENUM = ACC_DATA.init( _api.hap.Characteristic );
let CMD4_DEVICE_TYPE_ENUM = DEVICE_DATA.init( CMD4_ACC_TYPE_ENUM, _api.hap.Service, _api.hap.Characteristic, _api.hap.Categories );


// ******** QUICK TEST CMD4_ACC_TYPE_ENUM *************
describe( "Quick Test load of CMD4_ACC_TYPE_ENUM", ( ) =>
{
   it( "CMD4_ACC_TYPE_ENUM.EOL =" + ACC_EOL, ( ) =>
   {
     expect( CMD4_ACC_TYPE_ENUM.EOL ).to.equal( ACC_EOL );
   });
});

// ******** QUICK TEST CMD4_DEVICE_TYPE_ENUM *************
describe( "Quick Test load of CMD4_DEVICE_TYPE_ENUM", ( ) =>
{
   it( "CMD4_DEVICE_TYPE_ENUM.EOL =" + DEVICE_EOL, ( ) =>
  {
     expect( CMD4_DEVICE_TYPE_ENUM.EOL ).to.equal( DEVICE_EOL );
  });
});

// ******** TEST extractKeyValue.*************
describe( "Testing extractKeyValue", ( ) =>
{
   it( "extractKeyValue should be a function", ( ) =>
   {
      expect( extractKeyValue).to.be.a( "function", "extractKeyValue is not a function. found: " + typeof extractKeyValue );
   });

   it( "extractKeyValue should return correct key", ( ) =>
   {
      let accTypeEnumIndex = CMD4_ACC_TYPE_ENUM.CurrentDoorState;
      let expectedKey = "CLOSING";
      let value = 3;
      let result = extractKeyValue( CMD4_ACC_TYPE_ENUM.properties[ accTypeEnumIndex ].validValues, value );
      expect( result ).to.equal( expectedKey, "Test 1 extractKeyValue( " + value + " ) returned:" + result  + " expected:" +  expectedKey );
   });

   it( "extractKeyValue should return undefined for no value", ( ) =>
   {
      let accTypeEnumIndex = CMD4_ACC_TYPE_ENUM.CurrentDoorState;
      let expectedKey = undefined;
      let value = undefined;
      let result = extractKeyValue( CMD4_ACC_TYPE_ENUM.properties[ accTypeEnumIndex ].validValues, value );
      expect( result ).to.equal( expectedKey, "Test 2 extractKeyValue( " + value + " ) returned:" + result  + " expected:" +  expectedKey );
   });

   it( "extractKeyValue For last index should reterun last key", ( ) =>
   {
      let accTypeEnumIndex = CMD4_ACC_TYPE_ENUM.CurrentDoorState;
      let keys = Object.keys( CMD4_ACC_TYPE_ENUM.properties[ accTypeEnumIndex ].validValues );
      let keyCount = keys.length;
      let expectedKey =  keys[keyCount -1 ];
      let value = keyCount -1;
      let result = extractKeyValue( CMD4_ACC_TYPE_ENUM.properties[ accTypeEnumIndex ].validValues, value );
      expect( result ).to.equal( expectedKey, "Test 3 extractKeyValue( " + value + " ) returned:" + result  + " expected:" +  expectedKey );
   });

});

describe( "Testing transposeConstantToValidValue", ( ) =>
{
   it( "transposeConstantToValidValue should return originalfor no translation ", ( ) =>
   {
      // has {} for validValues
      let accTypeEnumIndex = CMD4_ACC_TYPE_ENUM.AccessControlLevel;
      let constantToBeChecked = "DUMMY";
      let expectedResult = constantToBeChecked;

      let result = transposeConstantToValidValue( CMD4_ACC_TYPE_ENUM.properties, accTypeEnumIndex, constantToBeChecked );

      expect( result ).to.equal( expectedResult, "transposeConstantToValidValue from " + constantToBeChecked + " returned " + result + " instead of " + expectedResult + " for " + CMD4_ACC_TYPE_ENUM.properties[ accTypeEnumIndex ].type );
   });

   it( "transposeConstantToValidValue should return correct constant for 0-INACTIVE ", ( ) =>
   {
      // has { "INACTIVE" & "ACTIVE"} for validValues
      let accTypeEnumIndex = CMD4_ACC_TYPE_ENUM.Active;
      let constantToBeChecked = "INACTIVE";
      let expectedResult = 0;

      let result = transposeConstantToValidValue( CMD4_ACC_TYPE_ENUM.properties, accTypeEnumIndex, constantToBeChecked );

      expect( result ).to.equal( expectedResult, "transposeConstantToValidValue from " + constantToBeChecked + " returned " + result + " instead of " + expectedResult + " for " + CMD4_ACC_TYPE_ENUM.properties[ accTypeEnumIndex ].type );
   });

   it( "transposeConstantToValidValue should return correct constant for 0-iNACTIVE ", ( ) =>
   {
      // has { "INACTIVE" & "ACTIVE"} for validValues
      let accTypeEnumIndex = CMD4_ACC_TYPE_ENUM.Active;
      let constantToBeChecked = "INACTIVE";
      let expectedResult = 0;

      let result = transposeConstantToValidValue( CMD4_ACC_TYPE_ENUM.properties, accTypeEnumIndex, constantToBeChecked );

      expect( result ).to.equal( expectedResult, "transposeConstantToValidValue from " + constantToBeChecked + " returned " + result + " instead of " + expectedResult + " for " + CMD4_ACC_TYPE_ENUM.properties[ accTypeEnumIndex ].type );
   });

   it( "transposeConstantToValidValue should return correct constant for 1-ACTIVE ", ( ) =>
   {
      // has { "INACTIVE" & "ACTIVE"} for validValues
      let accTypeEnumIndex = CMD4_ACC_TYPE_ENUM.Active;
      let constantToBeChecked = "ACTIVE";
      let expectedResult = 1;

      let result = transposeConstantToValidValue( CMD4_ACC_TYPE_ENUM.properties, accTypeEnumIndex, constantToBeChecked );

      expect( result ).to.equal( expectedResult, "transposeConstantToValidValue from " + constantToBeChecked + " returned " + result + " instead of " + expectedResult + " for " + CMD4_ACC_TYPE_ENUM.properties[ accTypeEnumIndex ].type );
   });

   it( `transposeConstantToValidValue should return correct value 1 for constant "TRUE" `, ( ) =>
   {
      // has { "FALSE" & "TRUE"} for validValues
      let accTypeEnumIndex = CMD4_ACC_TYPE_ENUM.AdministratorOnlyAccess;
      let constantToBeChecked = "TRUE";
      let expectedResult = 1;

      let result = transposeConstantToValidValue( CMD4_ACC_TYPE_ENUM.properties, accTypeEnumIndex, constantToBeChecked );

      expect( result ).to.equal( expectedResult, "transposeConstantToValidValue from " + constantToBeChecked + " returned " + result + " instead of " + expectedResult + " for " + CMD4_ACC_TYPE_ENUM.properties[ accTypeEnumIndex ].type );
   });
});


describe( "Testing transposeValueToValidConstant", ( ) =>
{
   it( "transposeValueToValidConstant should return original for no translation ", ( ) =>
   {
      // has {} for validValues
      let accTypeEnumIndex = CMD4_ACC_TYPE_ENUM.AccessControlLevel;
      let valueToBeChecked = "DUMMY";
      let expectedResult = valueToBeChecked;

      let result = transposeValueToValidConstant( CMD4_ACC_TYPE_ENUM.properties, accTypeEnumIndex, valueToBeChecked );

      expect( result ).to.equal( expectedResult, "transposeValueToValidConstant from " + valueToBeChecked + " returned " + result + " instead of " + expectedResult + " for " + CMD4_ACC_TYPE_ENUM.properties[ accTypeEnumIndex ].type );
   });

   it( "transposeValueToValidConstant should return correct constant for 0-INACTIVE ", ( ) =>
   {
      // has { "INACTIVE" & "ACTIVE"} for validValues
      let accTypeEnumIndex = CMD4_ACC_TYPE_ENUM.Active;
      let valueToBeChecked = 0;
      let expectedResult = "INACTIVE";

      let result = transposeValueToValidConstant( CMD4_ACC_TYPE_ENUM.properties, accTypeEnumIndex, valueToBeChecked );

      expect( result ).to.equal( expectedResult, "transposeValueToValidConstant from " + valueToBeChecked + " returned " + result + " instead of " + expectedResult + " for " + CMD4_ACC_TYPE_ENUM.properties[ accTypeEnumIndex ].type );
   });

   it( "transposeValueToValidConstant should return correct constant for 1-ACTIVE ", ( ) =>
   {
      // has { "INACTIVE" & "ACTIVE"} for validValues
      let accTypeEnumIndex = CMD4_ACC_TYPE_ENUM.Active;
      let valueToBeChecked = 1;
      let expectedResult = "ACTIVE";

      let result = transposeValueToValidConstant( CMD4_ACC_TYPE_ENUM.properties, accTypeEnumIndex, valueToBeChecked );

      expect( result ).to.equal( expectedResult, "transposeValueToValidConstant from " + valueToBeChecked + " returned " + result + " instead of " + expectedResult + " for " + CMD4_ACC_TYPE_ENUM.properties[ accTypeEnumIndex ].type );
   });

   it( "transposeValueToValidConstant should return correct constant for value 1", ( ) =>
   {
      // has { "FALSE" & "TRUE"} for validValues
      let accTypeEnumIndex = CMD4_ACC_TYPE_ENUM.AdministratorOnlyAccess;
      let valueToBeChecked = 1;
      let expectedResult = "TRUE";

      let result = transposeValueToValidConstant( CMD4_ACC_TYPE_ENUM.properties, accTypeEnumIndex, valueToBeChecked );

      expect( result ).to.equal( expectedResult, "transposeValueToValidConstant from " + valueToBeChecked + " returned " + result + " instead of " + expectedResult + " for " + CMD4_ACC_TYPE_ENUM.properties[ accTypeEnumIndex ].type );
   });
});


// TEST all Possible validValues for transposeValueToValidConstant
describe( "Testing all Possible validValues for  transposeValueToValidConstant", ( ) =>
{
   for ( let index = 0; index < CMD4_ACC_TYPE_ENUM.EOL; index ++ )
   // for ( let index = CMD4_ACC_TYPE_ENUM.EOL -1 ; index < CMD4_ACC_TYPE_ENUM.EOL; index ++ )
   {
      if ( Array.isArray( CMD4_ACC_TYPE_ENUM.properties[ index ].validValues ))
      {
         let numberOfValues =
            CMD4_ACC_TYPE_ENUM.properties[ index ].values.length;
         for ( let vindex = 0; vindex < numberOfValues; vindex ++ )
         {
            // testTransposeValueTo( CMD4_ACC_TYPE_ENUM.properties, index,
            //    CMD4_ACC_TYPE_ENUM.properties[ index ].validValues[ vindex ], true );
            testTransposeValueTo( CMD4_ACC_TYPE_ENUM.properties, index, vindex, true );
         }
      } else {

         //testTransposeValueTo( CMD4_ACC_TYPE_ENUM.properties, index,
         //      CMD4_ACC_TYPE_ENUM.properties[ index ].validValues, true );
         testTransposeValueTo( CMD4_ACC_TYPE_ENUM.properties, index, index, true );
      }
   }

   // Test a failing one
   //testTransposeValueTo( CMD4_ACC_TYPE_ENUM.properties, 0, {"one": "1", "two": "2"}, false );
   testTransposeValueTo( CMD4_ACC_TYPE_ENUM.properties, 0, 7, false );
});

// TEST all Possible transposeConstantToValidValue
describe( "Testing all Possible transposeConstantToValidValue", ( ) =>
{
   for ( let index =0 ; index < CMD4_ACC_TYPE_ENUM.EOL; index ++ )
   // for ( let index = CMD4_ACC_TYPE_ENUM.EOL -1 ; index < CMD4_ACC_TYPE_ENUM.EOL; index ++ )
   {
      if ( Array.isArray( CMD4_ACC_TYPE_ENUM.properties[ index ].validValues ))
      {
         let numberOfValues =
            CMD4_ACC_TYPE_ENUM.properties[ index ].validValues.length;
         for ( let vindex = 0; vindex < numberOfValues; vindex ++ )
         {
            //testTransposeConstantTo( CMD4_ACC_TYPE_ENUM.properties, index,
            //   CMD4_ACC_TYPE_ENUM.properties[ index ].validValues[ vindex ], true );
            testTransposeConstantTo( CMD4_ACC_TYPE_ENUM.properties, index, vindex, true );
         }
      } else {

         //testTransposeConstantTo( CMD4_ACC_TYPE_ENUM.properties, index,
         //      CMD4_ACC_TYPE_ENUM.properties[ index ].validValues, true );
         testTransposeConstantTo( CMD4_ACC_TYPE_ENUM.properties, index, index, true );
      }
   }

   // Test a failing one
   //testTransposeConstantTo( CMD4_ACC_TYPE_ENUM.properties, 0, {"one": "1", "two": "2"}, false );
   testTransposeConstantTo( CMD4_ACC_TYPE_ENUM.properties, 0, 7, false );

});




// ***************** Common way of testing functions above **********************


function testTransposeConstantTo( CMD4_ENUM_properties_obj, accTypeEnumIndex, vindex, shouldPass )
{
   // if ( ! obj )
   if ( ! CMD4_ENUM_properties_obj[accTypeEnumIndex].validValues )
   {
      // Nothing to do
      return;
   }
   //let numberOfKeyValuePairs = Object.keys( obj );
   let numberOfKeyValuePairs = Object.keys( CMD4_ENUM_properties_obj[accTypeEnumIndex].validValues );

   if ( numberOfKeyValuePairs < 0 )
   {
      // Nothing to do
      return;
   }

   //for ( let key in obj )
   for ( let key in CMD4_ENUM_properties_obj[accTypeEnumIndex].validValues )
   {
      let valueThatShouldBeReturned = CMD4_ENUM_properties_obj[accTypeEnumIndex].validValues[ key ];

      let value = transposeConstantToValidValue( CMD4_ENUM_properties_obj, accTypeEnumIndex, key);

      it( "transposeConstantToValidValue for: " + CMD4_ENUM_properties_obj[accTypeEnumIndex].type + " should return expected value: " + value + " for key: " + key, ( ) =>
      {
         if ( shouldPass )
         {
            expect( valueThatShouldBeReturned ).to.equal( value, "transposeConstantTo from " + key + " returned " + value + " instead of " + valueThatShouldBeReturned + " for " + CMD4_ACC_TYPE_ENUM.properties[ accTypeEnumIndex ].type );
         } else
         {
            expect( valueThatShouldBeReturned ).to.not.equal( value, "transposeConstantTo from " + key + " returned " + value + " instead of " + valueThatShouldBeReturned + " for " + CMD4_ACC_TYPE_ENUM.properties[ accTypeEnumIndex ].type );
         }
      });

   }
}

function testTransposeValueTo( CMD4_ENUM_properties_obj, accTypeEnumIndex, vindex, shouldPass )
{
   //let numberOfKeyValuePairs = Object.keys( obj );
   let numberOfKeyValuePairs = Object.keys( CMD4_ENUM_properties_obj[accTypeEnumIndex].validValues );

   if ( numberOfKeyValuePairs < 0 )
   {
      // Nothing to do
      return;
   }

   // for ( let key in obj )
   for ( let key in CMD4_ENUM_properties_obj[accTypeEnumIndex].validValues )
   {
      //let constantToBeChecked = obj[ key ];
      let constantToBeChecked = CMD4_ENUM_properties_obj[accTypeEnumIndex].validValues[ key ];

      let constant = transposeValueToValidConstant( CMD4_ENUM_properties_obj, accTypeEnumIndex, constantToBeChecked );

      //it( "transposeValueToValidConstant should return expected constant", ( ) =>
      it( "transposeValueToValidConstant should return expected constant: " + constantToBeChecked + " for key: " + key, ( ) =>
      {
         if ( shouldPass )
         {
            expect( key ).to.equal( constant, "transposeValueTo from " + constantToBeChecked + " returned " + constant + " instead of " + key + " for " + CMD4_ACC_TYPE_ENUM.properties[ accTypeEnumIndex ].type );
         } else
         {
            expect( key ).to.not.equal( constant, "transposeValueTo from " + constantToBeChecked + " returned " + constant + " instead of " + key + " for " + CMD4_ACC_TYPE_ENUM.properties[ accTypeEnumIndex ].type );
         }
      });
   }
}
