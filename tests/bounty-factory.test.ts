import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { BountyClosed } from "../generated/schema"
import { BountyClosed as BountyClosedEvent } from "../generated/BountyFactory/BountyFactory"
import { handleBountyClosed } from "../src/bounty-factory"
import { createBountyClosedEvent } from "./bounty-factory-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let bountyId = "Example string value"
    let newBountyClosedEvent = createBountyClosedEvent(bountyId)
    handleBountyClosed(newBountyClosedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("BountyClosed created and stored", () => {
    assert.entityCount("BountyClosed", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "BountyClosed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "bountyId",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
