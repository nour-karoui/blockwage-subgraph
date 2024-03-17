import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  BountyClosed,
  BountyCreated,
  BountyFunded,
  BountyResolved,
  PropositionCreated
} from "../generated/BountyFactory/BountyFactory"

export function createBountyClosedEvent(bountyId: string): BountyClosed {
  let bountyClosedEvent = changetype<BountyClosed>(newMockEvent())

  bountyClosedEvent.parameters = new Array()

  bountyClosedEvent.parameters.push(
    new ethereum.EventParam("bountyId", ethereum.Value.fromString(bountyId))
  )

  return bountyClosedEvent
}

export function createBountyCreatedEvent(
  bounty: ethereum.Tuple
): BountyCreated {
  let bountyCreatedEvent = changetype<BountyCreated>(newMockEvent())

  bountyCreatedEvent.parameters = new Array()

  bountyCreatedEvent.parameters.push(
    new ethereum.EventParam("bounty", ethereum.Value.fromTuple(bounty))
  )

  return bountyCreatedEvent
}

export function createBountyFundedEvent(
  bountyId: string,
  value: BigInt
): BountyFunded {
  let bountyFundedEvent = changetype<BountyFunded>(newMockEvent())

  bountyFundedEvent.parameters = new Array()

  bountyFundedEvent.parameters.push(
    new ethereum.EventParam("bountyId", ethereum.Value.fromString(bountyId))
  )
  bountyFundedEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return bountyFundedEvent
}

export function createBountyResolvedEvent(
  bountyId: string,
  solver: Address
): BountyResolved {
  let bountyResolvedEvent = changetype<BountyResolved>(newMockEvent())

  bountyResolvedEvent.parameters = new Array()

  bountyResolvedEvent.parameters.push(
    new ethereum.EventParam("bountyId", ethereum.Value.fromString(bountyId))
  )
  bountyResolvedEvent.parameters.push(
    new ethereum.EventParam("solver", ethereum.Value.fromAddress(solver))
  )

  return bountyResolvedEvent
}

export function createPropositionCreatedEvent(
  bountyId: string,
  proposition: ethereum.Tuple
): PropositionCreated {
  let propositionCreatedEvent = changetype<PropositionCreated>(newMockEvent())

  propositionCreatedEvent.parameters = new Array()

  propositionCreatedEvent.parameters.push(
    new ethereum.EventParam("bountyId", ethereum.Value.fromString(bountyId))
  )
  propositionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "proposition",
      ethereum.Value.fromTuple(proposition)
    )
  )

  return propositionCreatedEvent
}
