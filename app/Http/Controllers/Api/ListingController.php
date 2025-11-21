<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreListingRequest;
use App\Http\Resources\ListingResource;
use App\Models\Listing;
use Illuminate\Http\Request;

class ListingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->get('limit', 6);
        $listings = Listing::latest()->paginate($perPage);

        return ListingResource::collection($listings);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreListingRequest $request)
    {
        $data = $request->validated();

        $user = $request->user();

        $data['user_id'] = $user->id;
        $data['company_id'] = $user->company->id;

        $listing = Listing::create($data);

        return new ListingResource($listing);
    }

    /**
     * Display the specified resource.
     */
    public function show(Listing $listing)
    {
        $listing->load('company');

        return new ListingResource($listing);
    }

    /**
     * Display a listing of the user's resource.
     */
    public function manage(Request $request)
    {
        $user = $request->user();

        $listings = $user->listings()
            ->latest()
            ->paginate(6);

        return ListingResource::collection($listings);
    }
}
